
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Star, Video } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for featured mentors
const featuredMentors = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Product Manager at TechCorp",
    rating: 4.9,
    reviews: 128,
    price: 75,
    topics: ["Product Management", "Career Transition", "Leadership"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UX Design Lead at DesignHub",
    rating: 4.8,
    reviews: 96,
    price: 60,
    topics: ["UX/UI Design", "Portfolio Review", "Design Leadership"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Sr. Software Engineer at BigTech",
    rating: 4.7,
    reviews: 152,
    price: 0,
    topics: ["Web Development", "JavaScript", "Career Advice"],
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

export const FeaturedMentors = () => {
  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Mentors</h2>
        <Link to="/browse" className="text-blue-600 hover:text-blue-800">
          View all mentors →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredMentors.map((mentor) => (
          <Card key={mentor.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-[3/2] overflow-hidden">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                </div>
                <span className="text-gray-500">({mentor.reviews} reviews)</span>
              </div>
              <CardTitle>{mentor.name}</CardTitle>
              <CardDescription>{mentor.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.topics.map((topic, index) => (
                  <Badge key={index} variant="secondary">{topic}</Badge>
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  <span>Video</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>Chat</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div>
                {mentor.price === 0 ? (
                  <span className="font-medium text-green-600">Free</span>
                ) : (
                  <span className="font-medium">${mentor.price}/hour</span>
                )}
              </div>
              <Link to={`/mentor/${mentor.id}`}>
                <Button>View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
