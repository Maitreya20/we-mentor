
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jessica R.",
    role: "Product Designer",
    quote: "Finding a mentor on WeMentor completely changed my career trajectory. The guidance I received helped me transition into a senior role within 6 months.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Software Developer",
    quote: "The free introductory sessions allowed me to connect with several mentors before finding the perfect match. Now I have regular sessions that keep me growing.",
    rating: 5
  },
  {
    name: "Priya K.",
    role: "Marketing Manager",
    quote: "My mentor provided practical advice that I could immediately apply to my work. The ROI on these sessions has been incredible.",
    rating: 4
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of professionals who have accelerated their growth with WeMentor
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
