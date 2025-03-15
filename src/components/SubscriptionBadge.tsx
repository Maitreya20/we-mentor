
import { Badge } from "@/components/ui/badge";
import { usePayment } from "@/contexts/PaymentContext";

export function SubscriptionBadge() {
  const { currentPlan } = usePayment();

  if (!currentPlan) {
    return null;
  }

  const badgeVariants = {
    free: {
      variant: "outline" as const,
      label: "Free Plan"
    },
    basic: {
      variant: "default" as const,
      label: "Basic Plan"
    },
    pro: {
      variant: "secondary" as const,
      label: "Pro Plan"
    }
  };

  const { variant, label } = badgeVariants[currentPlan];

  return <Badge variant={variant}>{label}</Badge>;
}
