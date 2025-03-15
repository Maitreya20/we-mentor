
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Calendar, Video, CreditCard, Award, Lightbulb, BookOpen, Users } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find a mentor",
      description: "Browse our curated list of experienced mentors across various fields and specializations."
    },
    {
      icon: Calendar,
      title: "Book a session",
      description: "Select a time that works for you and book a one-on-one mentoring session."
    },
    {
      icon: Video,
      title: "Meet virtually",
      description: "Connect with your mentor via video call for personalized guidance and advice."
    },
    {
      icon: Award,
      title: "Grow and learn",
      description: "Apply insights from your mentor to accelerate your personal and professional growth."
    }
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: "Expert guidance",
      description: "Get advice from professionals with proven success in your field of interest."
    },
    {
      icon: BookOpen,
      title: "Personalized learning",
      description: "Receive customized advice and resources tailored to your specific goals and challenges."
    },
    {
      icon: Users,
      title: "Expand your network",
      description: "Connect with industry leaders and build valuable professional relationships."
    },
    {
      icon: CreditCard,
      title: "Flexible pricing",
      description: "Choose mentors that fit your budget with various session options and packages."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How WeMentor Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our platform connects you with experienced mentors who can help guide your career,
            develop your skills, and achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/browse">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Find a Mentor
              </Button>
            </Link>
            <Link to="/become-mentor">
              <Button size="lg" variant="outline" className="gap-2">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* How It Works Steps */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Simple 4-Step Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="relative mb-4">
                  <div className="text-3xl font-bold text-blue-600">{index + 1}</div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-4 left-full w-full h-0.5 bg-blue-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Mentorship</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How do I choose the right mentor?",
                answer: "Browse mentors based on your industry, goals, and budget. Review profiles, experience, and specializations to find someone who aligns with your needs. You can also filter by ratings and read reviews from other mentees."
              },
              {
                question: "How much does mentorship cost?",
                answer: "Pricing varies by mentor based on their experience and industry. Mentors set their own rates, and you can filter by price range to find options that fit your budget. We offer both one-time sessions and package deals."
              },
              {
                question: "How long are mentoring sessions?",
                answer: "Most mentoring sessions last between 30-60 minutes, but some mentors offer extended sessions. You can check each mentor's profile for their available session durations."
              },
              {
                question: "Can I cancel or reschedule a session?",
                answer: "Yes, you can cancel or reschedule sessions up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours in advance may be subject to our cancellation policy."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-5">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Mentorship Journey?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Take the next step in your personal and professional development with guidance from industry experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/browse">
              <Button size="lg" variant="secondary" className="gap-2">
                Find Your Mentor
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 gap-2">
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
