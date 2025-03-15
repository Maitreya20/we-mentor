
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePayment } from "@/contexts/PaymentContext";
import { toast } from "@/hooks/use-toast";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { EnterprisePlan } from "@/components/pricing/EnterprisePlan";
import { FAQ } from "@/components/pricing/FAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";
import { faqData } from "@/data/faqData";

const Pricing = () => {
  const { user } = useAuth();
  const { subscribeToPlan, isProcessing } = usePayment();
  const navigate = useNavigate();

  const handleSubscribe = async (planType: "free" | "basic" | "pro") => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up to subscribe to a plan.",
      });
      navigate("/login");
      return;
    }

    await subscribeToPlan(planType);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <PricingHero />
      <PricingPlans 
        isLoggedIn={!!user} 
        isProcessing={isProcessing} 
        onSubscribe={handleSubscribe} 
      />
      <EnterprisePlan />
      <FAQ faqs={faqData} />
      <PricingCTA />
      <Footer />
    </div>
  );
};

export default Pricing;
