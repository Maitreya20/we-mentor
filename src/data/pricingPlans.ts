
export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlans {
  free: PricingFeature[];
  basic: PricingFeature[];
  pro: PricingFeature[];
}

export const pricingPlans: PricingPlans = {
  free: [
    { name: "Browse mentor profiles", included: true },
    { name: "View mentor availability", included: true },
    { name: "Read reviews and ratings", included: true },
    { name: "1 free introductory call", included: true },
    { name: "Direct messaging with mentors", included: false },
    { name: "Session recordings", included: false },
    { name: "Priority booking", included: false },
    { name: "Personalized mentor matching", included: false },
  ],
  basic: [
    { name: "Browse mentor profiles", included: true },
    { name: "View mentor availability", included: true },
    { name: "Read reviews and ratings", included: true },
    { name: "5 mentoring sessions/month", included: true },
    { name: "Direct messaging with mentors", included: true },
    { name: "Session recordings", included: true },
    { name: "Priority booking", included: false },
    { name: "Personalized mentor matching", included: false },
  ],
  pro: [
    { name: "Browse mentor profiles", included: true },
    { name: "View mentor availability", included: true },
    { name: "Read reviews and ratings", included: true },
    { name: "Unlimited mentoring sessions", included: true },
    { name: "Direct messaging with mentors", included: true },
    { name: "Session recordings", included: true },
    { name: "Priority booking", included: true },
    { name: "Personalized mentor matching", included: true },
  ],
};
