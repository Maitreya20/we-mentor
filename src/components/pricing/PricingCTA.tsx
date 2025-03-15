
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PricingCTA() {
  return (
    <div className="bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Mentorship Journey?</h2>
        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
          Choose the plan that works best for you and start connecting with experienced mentors today.
        </p>
        <Link to="/signup">
          <Button size="lg" variant="secondary">
            Get Started For Free
          </Button>
        </Link>
      </div>
    </div>
  );
}
