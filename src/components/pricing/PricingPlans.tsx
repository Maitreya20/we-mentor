
import { PricingCard } from "./PricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingPlans } from "@/data/pricingPlans";

interface PricingPlansProps {
  isLoggedIn: boolean;
  isProcessing: boolean;
  onSubscribe: (planType: "free" | "basic" | "pro") => Promise<void>;
}

export function PricingPlans({ isLoggedIn, isProcessing, onSubscribe }: PricingPlansProps) {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly">
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Free"
                price={0}
                period="month"
                description="Perfect for exploring the platform and finding the right mentor."
                features={pricingPlans.free}
                buttonText="Get Started"
                buttonVariant="outline"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("free")}
              />
              
              <PricingCard
                title="Basic"
                price={49}
                period="month"
                description="Great for regular mentoring with flexible session options."
                features={pricingPlans.basic}
                isPopular={true}
                buttonText="Subscribe Now"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("basic")}
              />
              
              <PricingCard
                title="Pro"
                price={99}
                period="month"
                description="For serious professionals seeking comprehensive mentorship."
                features={pricingPlans.pro}
                buttonText="Subscribe Now"
                buttonVariant="outline"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("pro")}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="annual">
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                title="Free"
                price={0}
                period="year"
                description="Perfect for exploring the platform and finding the right mentor."
                features={pricingPlans.free}
                buttonText="Get Started"
                buttonVariant="outline"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("free")}
              />
              
              <PricingCard
                title="Basic"
                price={39}
                period="month"
                description="Great for regular mentoring with flexible session options."
                features={pricingPlans.basic}
                isPopular={true}
                buttonText="Subscribe Now"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("basic")}
                billingCycle="annual"
              />
              
              <PricingCard
                title="Pro"
                price={79}
                period="month"
                description="For serious professionals seeking comprehensive mentorship."
                features={pricingPlans.pro}
                buttonText="Subscribe Now"
                buttonVariant="outline"
                isLoggedIn={isLoggedIn}
                isProcessing={isProcessing}
                onClick={() => onSubscribe("pro")}
                billingCycle="annual"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
