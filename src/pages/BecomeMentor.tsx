
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { CheckCircle2, Award, DollarSign, Clock, Users, Calendar, Video, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

const BecomeMentor = () => {
  const [formStep, setFormStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Application submitted successfully!");
      // In a real app, navigate to confirmation page
    }, 1500);
  };
  
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn income",
      description: "Set your own rates and earn money sharing your expertise with others."
    },
    {
      icon: Users,
      title: "Build your network",
      description: "Connect with motivated professionals and expand your professional network."
    },
    {
      icon: Award,
      title: "Gain recognition",
      description: "Establish yourself as a thought leader in your field."
    },
    {
      icon: Clock,
      title: "Flexible schedule",
      description: "Choose when you're available and mentor on your own terms."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Your Expertise as a Mentor</h1>
              <p className="text-xl text-gray-600 mb-8">
                Help others grow while earning income and building your professional reputation.
              </p>
              <Button size="lg" onClick={() => setFormStep(1)} className="gap-2">
                Apply Now
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Mentor helping mentee" 
                className="rounded-lg shadow-lg object-cover h-[400px] w-full" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-gray-600">
                  "Becoming a mentor has been incredibly rewarding. I've helped others while growing my own skills."
                </p>
                <p className="text-sm font-semibold mt-2">- Sarah J., Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Become a Mentor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-6 shadow-sm">
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
      
      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How Mentoring Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Set your schedule",
                description: "Define when you're available to mentor. Our calendar system makes scheduling effortless."
              },
              {
                icon: Video,
                title: "Host sessions",
                description: "Connect with mentees through our video platform for seamless virtual mentoring."
              },
              {
                icon: MessageSquare,
                title: "Provide feedback",
                description: "Share insights, answer questions, and help mentees navigate challenges."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Application Form */}
      {formStep > 0 && (
        <div className="py-16 bg-white" id="apply">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-2">Become a Mentor</h2>
            <p className="text-gray-600 text-center mb-8">Share your details to join our mentor community</p>
            
            <Card>
              <CardContent className="pt-6">
                {formStep === 1 && (
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input id="firstName" placeholder="Your first name" required />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input id="lastName" placeholder="Your last name" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email address" required />
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile
                      </label>
                      <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                    </div>
                    <div>
                      <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                        Areas of Expertise
                      </label>
                      <Input id="expertise" placeholder="e.g., Product Management, UX Design, Marketing" required />
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setFormStep(2)}>
                        Continue
                      </Button>
                    </div>
                  </form>
                )}
                
                {formStep === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Experience
                      </label>
                      <Textarea 
                        id="experience" 
                        placeholder="Briefly describe your professional background and experience" 
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="mentorReason" className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to be a mentor?
                      </label>
                      <Textarea 
                        id="mentorReason" 
                        placeholder="Share why you're interested in becoming a mentor" 
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Hourly Rate ($)
                      </label>
                      <Input id="hourlyRate" type="number" placeholder="e.g., 75" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="termsAccepted" />
                      <label htmlFor="termsAccepted" className="text-sm text-gray-500">
                        I agree to the{" "}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Hear From Our Mentors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Tech Lead at Google",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
                quote: "Being a mentor has allowed me to give back to the community while sharpening my own leadership skills."
              },
              {
                name: "Maria Rodriguez",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
                quote: "I've built amazing connections with professionals across industries through mentoring on this platform."
              },
              {
                name: "David Johnson",
                role: "Product Manager",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
                quote: "The platform makes it easy to manage my schedule and connect with mentees who are truly eager to learn."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Share Your Knowledge?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join our community of mentors and start making a difference while growing your own career.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => {
              setFormStep(1);
              document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="gap-2"
          >
            Apply to Become a Mentor
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeMentor;
