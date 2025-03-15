
import { createContext, useContext, ReactNode, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

type PlanType = "free" | "basic" | "pro";

interface PaymentContextType {
  subscribeToPlan: (planType: PlanType) => Promise<void>;
  isProcessing: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle free plan subscription
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
      // For paid plans in a real app, this would integrate with a payment gateway
      // For now, we'll just update the user's subscription in the database
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

      toast({
        title: "Subscription successful",
        description: `You are now subscribed to the ${planType} plan.`
      });
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
    isProcessing
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
