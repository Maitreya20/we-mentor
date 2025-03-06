
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Find Your Perfect <span className="text-blue-600">Mentor</span>
          </h1>
          <p className="text-xl text-gray-600">
            Connect with experienced mentors for personalized guidance in your career, 
            skills development, or personal growth journey.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link to="/browse">
              <Button size="lg" className="w-full sm:w-auto">
                Find a Mentor
              </Button>
            </Link>
            <Link to="/become-mentor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Become a Mentor
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>🔒 Secure sessions</span>
            <span>•</span>
            <span>✓ Verified mentors</span>
            <span>•</span>
            <span>💬 Free intro calls</span>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            alt="Mentoring session" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};
