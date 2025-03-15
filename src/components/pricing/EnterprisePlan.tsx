
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function EnterprisePlan() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
              <p className="text-gray-600 mb-6">
                Looking to provide mentorship opportunities for your entire team or organization?
                Our enterprise plans offer customized solutions to meet your specific needs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span>Custom mentor matching for your team</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span>Progress tracking and reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span>Group mentoring sessions</span>
                </li>
              </ul>
              <Button size="lg">Contact Sales</Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Enterprise mentoring" 
                className="rounded-lg shadow-md object-cover h-[300px] w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
