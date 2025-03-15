
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const featuresByPlan = {
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

  // FAQ data
  const faqs = [
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that best fits your mentorship needs,
            with no hidden fees or complicated pricing structures.
          </p>
        </div>
      </div>
      
      {/* Pricing Tables */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Free</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Perfect for exploring the platform and finding the right mentor.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.free.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button variant="outline" className="w-full">Get Started</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Basic Plan */}
                <Card className="border-blue-100 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                    Popular
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">Basic</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$49</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Great for regular mentoring with flexible session options.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.basic.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button className="w-full">Subscribe Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Pro Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$99</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      For serious professionals seeking comprehensive mentorship.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.pro.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button variant="outline" className="w-full">Subscribe Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="annual">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Free Plan (Annual) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Free</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-gray-500">/year</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Perfect for exploring the platform and finding the right mentor.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.free.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button variant="outline" className="w-full">Get Started</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Basic Plan (Annual) */}
                <Card className="border-blue-100 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                    Popular
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">Basic</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$39</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Billed annually ($468)</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Great for regular mentoring with flexible session options.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.basic.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button className="w-full">Subscribe Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                {/* Pro Plan (Annual) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$79</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Billed annually ($948)</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      For serious professionals seeking comprehensive mentorship.
                    </p>
                    <ul className="space-y-3">
                      {featuresByPlan.pro.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-800" : "text-gray-400"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/signup" className="w-full">
                      <Button variant="outline" className="w-full">Subscribe Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Enterprise Section */}
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
      
      {/* FAQs */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
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
      
      <Footer />
    </div>
  );
};

export default Pricing;
