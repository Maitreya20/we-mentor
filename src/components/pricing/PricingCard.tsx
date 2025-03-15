
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, X, Loader2 } from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  onClick?: () => void;
  isProcessing?: boolean;
  isLoggedIn: boolean;
  billingCycle?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText,
  buttonVariant = "default",
  onClick,
  isProcessing = false,
  isLoggedIn,
  billingCycle,
}: PricingCardProps) {
  return (
    <Card className={isPopular ? "border-blue-100 shadow-md relative overflow-hidden" : ""}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
          Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500">/{period}</span>
        </div>
        {billingCycle === "annual" && (
          <div className="text-sm text-gray-500 mt-1">
            Billed annually (${price * 12})
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isLoggedIn ? (
          <Button
            variant={buttonVariant}
            className="w-full"
            onClick={onClick}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              buttonText
            )}
          </Button>
        ) : (
          <Link to="/signup" className="w-full">
            <Button variant={buttonVariant} className="w-full">
              {buttonText}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
