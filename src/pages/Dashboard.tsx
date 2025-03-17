
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Award, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const today = new Date();
  
  // Format date as "Monday, January 1"
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-1 py-8 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">{formattedDate}</p>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Main content area with mentorship dashboard */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Welcome back, {user?.email?.split('@')[0] || 'User'}</h2>
                    <p className="opacity-90 mt-1">Your mentorship journey awaits</p>
                  </div>
                  <Award className="h-12 w-12 opacity-80" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="secondary" className="w-full">Find a Mentor</Button>
                  <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Book a Session
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="past">Past Sessions</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Mentorship Sessions</CardTitle>
                    <CardDescription>Your scheduled sessions for the coming weeks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16 text-gray-500">
                      <p className="mb-4">You have no upcoming sessions scheduled</p>
                      <Button variant="outline">Browse Mentors</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="past">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Past Sessions</CardTitle>
                    <CardDescription>Previously completed mentorship sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16 text-gray-500">
                      <p>No past sessions yet</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recommended Mentors</CardTitle>
                    <CardDescription>Tailored suggestions based on your interests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Sarah Johnson",
                          role: "UX Designer at Google",
                          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                          rating: 4.9
                        },
                        {
                          name: "Michael Chen",
                          role: "Senior Developer at Amazon",
                          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                          rating: 4.8
                        }
                      ].map((mentor, index) => (
                        <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <img 
                            src={mentor.image} 
                            alt={mentor.name} 
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{mentor.name}</h3>
                            <p className="text-sm text-gray-600">{mentor.role}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm font-semibold text-amber-500">{mentor.rating}</span>
                              <div className="flex ml-1">
                                {Array(5).fill(0).map((_, i) => (
                                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button variant="outline">View All Mentors</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
