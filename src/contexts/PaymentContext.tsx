
import { createContext, useContext, ReactNode, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type PlanType = "free" | "basic" | "pro";

interface PaymentContextType {
  subscribeToPlan: (planType: PlanType) => Promise<void>;
  isProcessing: boolean;
  currentPlan?: PlanType;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PlanType | undefined>();
  const navigate = useNavigate();

  // Fetch the user's current plan when they log in
  useState(() => {
    if (user) {
      const fetchSubscription = async () => {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("plan_type")
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setCurrentPlan(data.plan_type as PlanType);
        }
      };

      fetchSubscription();
    } else {
      setCurrentPlan(undefined);
    }
  });

  // Function to handle subscription to a plan
  const subscribeToPlan = async (planType: PlanType) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to subscribe to a plan."
      });
      return;
    }

    setIsProcessing(true);

    try {
      // If it's the free plan, just update the database directly
      if (planType === "free") {
        const { error } = await supabase
          .from("subscriptions")
          .upsert({ 
            user_id: user.id, 
            plan_type: planType,
            active: true
          }, { 
            onConflict: "user_id"
          });

        if (error) {
          throw error;
        }

        setCurrentPlan(planType);
        
        toast({
          title: "Subscription successful",
          description: `You are now subscribed to the ${planType} plan.`
        });
        
        navigate("/");
        return;
      }

      // For paid plans, use the Stripe checkout
      const successUrl = `${window.location.origin}/subscription/success?plan=${planType}`;
      const cancelUrl = `${window.location.origin}/pricing`;

      // Call our Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          planType,
          userId: user.id,
          successUrl,
          cancelUrl
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // For testing, the checkoutUrl will directly be the success URL
      // In production, this would redirect to Stripe
      if (data.checkoutUrl) {
        // For our test implementation, we'll show a success message
        if (data.testMode) {
          setCurrentPlan(planType);
          toast({
            title: "Test Subscription Activated",
            description: `You are now subscribed to the ${planType} plan. (Test Mode)`
          });
          // Simulate a redirect to success page
          navigate("/");
        } else {
          // In production, redirect to Stripe checkout
          window.location.href = data.checkoutUrl;
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription error",
        description: error.message || "Failed to process subscription."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const value = {
    subscribeToPlan,
    isProcessing,
    currentPlan
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
