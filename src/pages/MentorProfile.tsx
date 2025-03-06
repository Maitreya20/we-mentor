
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Book, Calendar as CalendarIcon, Clock, Download, Globe, Linkedin, MessageSquare, Star, Twitter, User, Video } from "lucide-react";

// Sample mentor data - in a real app, this would come from an API
const mentors = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Product Manager at TechCorp",
    rating: 4.9,
    reviews: 128,
    bio: "I've been a product manager for over 8 years, working with both startups and enterprise companies. I specialize in helping people transition into product roles and developing leadership skills in product management.",
    expertise: ["Product Management", "Career Transition", "Leadership", "Product Strategy", "User Research"],
    price: 75,
    education: [
      { degree: "MBA", institution: "Stanford University", year: "2015" },
      { degree: "BS Computer Science", institution: "UC Berkeley", year: "2010" }
    ],
    experience: [
      { role: "Senior Product Manager", company: "TechCorp", duration: "2018 - Present" },
      { role: "Product Manager", company: "StartupXYZ", duration: "2015 - 2018" },
      { role: "Product Associate", company: "BigTech Inc.", duration: "2013 - 2015" }
    ],
    sessionTypes: ["1-on-1 Mentoring", "Resume Review", "Mock Interviews", "Career Planning"],
    availability: {
      monday: ["10:00 AM", "2:00 PM", "4:00 PM"],
      tuesday: ["9:00 AM", "1:00 PM", "5:00 PM"],
      wednesday: ["10:00 AM", "3:00 PM"],
      thursday: ["11:00 AM", "2:00 PM", "6:00 PM"],
      friday: ["9:00 AM", "12:00 PM", "3:00 PM"]
    },
    languages: ["English", "Spanish"],
    testimonials: [
      { name: "Sarah L.", content: "Alex helped me transition from engineering to product management. His guidance through the interview process was invaluable.", rating: 5 },
      { name: "Michael T.", content: "Great mentor! Provided actionable feedback on my product strategy and helped me develop a solid roadmap.", rating: 5 },
      { name: "Jennifer K.", content: "The resume review session was eye-opening. I implemented Alex's suggestions and got interviews at top tech companies.", rating: 4 }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson"
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "UX Design Lead at DesignHub",
    rating: 4.8,
    reviews: 96,
    bio: "With over 10 years in UX/UI design, I've helped companies create user-centered digital products. I'm passionate about mentoring designers who want to improve their portfolio or advance their design career.",
    expertise: ["UX/UI Design", "Portfolio Review", "Design Leadership", "User Research", "Interaction Design"],
    price: 60,
    education: [
      { degree: "MA Design", institution: "Rhode Island School of Design", year: "2012" },
      { degree: "BA Graphic Design", institution: "University of Washington", year: "2008" }
    ],
    experience: [
      { role: "UX Design Lead", company: "DesignHub", duration: "2019 - Present" },
      { role: "Senior UX Designer", company: "CreativeTech", duration: "2015 - 2019" },
      { role: "UI Designer", company: "WebSolutions", duration: "2012 - 2015" }
    ],
    sessionTypes: ["Portfolio Review", "1-on-1 Mentoring", "Design Critique", "Career Guidance"],
    availability: {
      monday: ["9:00 AM", "1:00 PM"],
      tuesday: ["10:00 AM", "3:00 PM", "5:00 PM"],
      wednesday: ["11:00 AM", "2:00 PM", "4:00 PM"],
      thursday: ["9:00 AM", "12:00 PM"],
      friday: ["10:00 AM", "1:00 PM", "4:00 PM"]
    },
    languages: ["English", "Mandarin"],
    testimonials: [
      { name: "David R.", content: "Sarah's portfolio review gave me exactly what I needed to land my first UX role. Her feedback was constructive and actionable.", rating: 5 },
      { name: "Lisa J.", content: "Incredible mentor! Sarah helped me understand how to communicate design decisions effectively to stakeholders.", rating: 5 },
      { name: "Ryan P.", content: "Great insights into UX leadership. Sarah's advice helped me navigate my transition to a lead role.", rating: 4 }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen"
    },
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "3",
    name: "Michael Brown",
    title: "Sr. Software Engineer at BigTech",
    rating: 4.7,
    reviews: 152,
    bio: "I'm a software engineer with 12+ years of experience, specializing in web development, JavaScript frameworks, and system architecture. I offer free mentoring to help developers grow in their careers.",
    expertise: ["Web Development", "JavaScript", "Career Advice", "System Architecture", "React", "Node.js"],
    price: 0,
    education: [
      { degree: "MS Computer Science", institution: "MIT", year: "2009" },
      { degree: "BS Software Engineering", institution: "Georgia Tech", year: "2006" }
    ],
    experience: [
      { role: "Sr. Software Engineer", company: "BigTech", duration: "2017 - Present" },
      { role: "Software Engineer", company: "TechStartup", duration: "2014 - 2017" },
      { role: "Junior Developer", company: "WebAgency", duration: "2010 - 2014" }
    ],
    sessionTypes: ["Code Review", "1-on-1 Mentoring", "Technical Interview Prep", "Career Guidance"],
    availability: {
      monday: ["4:00 PM", "6:00 PM"],
      tuesday: ["5:00 PM", "7:00 PM"],
      wednesday: ["4:00 PM", "8:00 PM"],
      thursday: ["5:00 PM", "7:00 PM"],
      friday: ["6:00 PM", "8:00 PM"]
    },
    languages: ["English"],
    testimonials: [
      { name: "Jessica M.", content: "Michael helped me prepare for technical interviews and I landed a job at a FAANG company. His insights were invaluable.", rating: 5 },
      { name: "Thomas K.", content: "Great mentor for React and JavaScript. I learned more practical skills in a few sessions than in months of online courses.", rating: 4 },
      { name: "Amir P.", content: "Michael's code reviews have significantly improved my development skills. Highly recommended for junior developers.", rating: 5 }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelbrown",
      twitter: "https://twitter.com/michaelbrown"
    },
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const MentorProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("about");
  
  // Find the mentor by id
  const mentor = mentors.find(m => m.id === id);
  
  if (!mentor) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Mentor Not Found</h1>
            <p className="mb-8">The mentor you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Browse Mentors</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get the time slots for the selected date
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'lowercase' });
  };
  
  const getTimeSlots = () => {
    const day = getDayName(selectedDate || new Date());
    return mentor.availability[day as keyof typeof mentor.availability] || [];
  };
  
  const timeSlots = getTimeSlots();

  const handleBookSession = () => {
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }
    
    toast.success(`Session booked with ${mentor.name} on ${selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''} at ${selectedTimeSlot}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Mentor Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img src={mentor.image} alt={mentor.name} className="w-full aspect-square object-cover" />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{mentor.rating}</span>
              </div>
              <span className="text-gray-500">({mentor.reviews} reviews)</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{mentor.title}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {mentor.expertise.map((topic, index) => (
                <Badge key={index} variant="secondary">{topic}</Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <span>{mentor.languages.join(", ")}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {mentor.socialLinks.linkedin && (
                  <a href={mentor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {mentor.socialLinks.twitter && (
                  <a href={mentor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-gray-600" />
                <span>Video Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <span>Chat Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>Responds within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {mentor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">{mentor.bio}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Education</h3>
                    <div className="space-y-3 mb-6">
                      {mentor.education.map((edu, index) => (
                        <div key={index} className="flex flex-col">
                          <span className="font-medium">{edu.degree}</span>
                          <span className="text-gray-600">{edu.institution}, {edu.year}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Languages</h3>
                    <div className="mb-6">
                      <p>{mentor.languages.join(", ")}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mentor.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4 relative">
                          <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                          <h3 className="font-semibold text-lg">{exp.role}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sessions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentor.sessionTypes.map((session, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Book className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <h3 className="font-medium">{session}</h3>
                              <p className="text-sm text-gray-600">60 minutes</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews ({mentor.reviews})</CardTitle>
                    <CardDescription>Overall Rating: {mentor.rating} / 5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mentor.testimonials.map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="h-5 w-5 text-gray-600" />
                            <span className="font-medium">{review.name}</span>
                            <div className="flex items-center">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ))}
                              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-gray-300" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Sidebar */}
          <div className="mt-6 md:mt-0">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>
                  {mentor.price === 0 ? (
                    <span className="text-green-600 font-semibold">Free Mentoring</span>
                  ) : (
                    <span className="text-xl font-semibold">${mentor.price}/hour</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select a date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Available time slots</h3>
                  {timeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time, index) => (
                        <Button
                          key={index}
                          variant={selectedTimeSlot === time ? "default" : "outline"}
                          onClick={() => setSelectedTimeSlot(time)}
                          className="text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No available slots on this date</p>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" size="lg" onClick={handleBookSession}>
                    Book Session
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2 border-t pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Video className="h-4 w-4" />
                  <span>Session via video call</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>Get session recording afterward</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorProfile;
