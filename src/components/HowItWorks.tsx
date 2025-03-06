
import { Calendar, Search, Video, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Mentor",
    description: "Browse our diverse community of mentors. Filter by expertise, price, and availability to find your perfect match."
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description: "Schedule a one-on-one session that fits your calendar. Choose between free or paid sessions based on your needs."
  },
  {
    icon: Video,
    title: "Connect & Learn",
    description: "Meet your mentor via our secure video platform. Get personalized guidance and actionable advice."
  },
  {
    icon: ThumbsUp,
    title: "Grow & Succeed",
    description: "Apply your learnings, track your progress, and book follow-up sessions to continue your growth journey."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 rounded-xl my-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How WeMentor Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to connect with mentors and start your growth journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
