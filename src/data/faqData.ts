
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How are mentoring sessions conducted?",
    answer: "Mentoring sessions are conducted via our built-in video conferencing platform. You'll receive a link to join the session at the scheduled time. Sessions can last 30, 45, or 60 minutes, depending on what you arrange with your mentor."
  },
  {
    question: "Can I change my subscription plan?",
    answer: "Yes, you can upgrade or downgrade your subscription at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the change will take effect at the end of your current billing cycle."
  },
  {
    question: "Are there any refunds if I'm not satisfied?",
    answer: "We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within 7 days of your initial subscription for a full refund."
  },
  {
    question: "Do unused sessions roll over to the next month?",
    answer: "Sessions on the Basic plan do not roll over to the next month. We encourage you to use all of your allocated sessions each month for maximum benefit."
  },
  {
    question: "Can I book sessions with different mentors?",
    answer: "Absolutely! You can book sessions with any available mentors on the platform, regardless of your subscription plan. This allows you to learn from various experts across different areas of expertise."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to your subscription benefits until the end of your current billing period."
  }
];
