
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, ChevronDown, Filter, Search, MessageSquare, Star, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

// Sample mentor data - in a real app, this would come from an API
const mentorData = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Product Manager at TechCorp",
    rating: 4.9,
    reviews: 128,
    price: 75,
    topics: ["Product Management", "Career Transition", "Leadership"],
    availability: ["Monday", "Wednesday", "Friday"],
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
    availability: ["Tuesday", "Thursday", "Saturday"],
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
    availability: ["Monday", "Wednesday", "Sunday"],
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    name: "Jessica Williams",
    title: "Data Science Manager",
    rating: 4.9,
    reviews: 87,
    price: 85,
    topics: ["Data Science", "Machine Learning", "Python"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    name: "David Kim",
    title: "Marketing Director at GrowthCo",
    rating: 4.6,
    reviews: 74,
    price: 65,
    topics: ["Digital Marketing", "Growth Strategy", "SEO"],
    availability: ["Wednesday", "Friday", "Sunday"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    title: "Senior Frontend Developer",
    rating: 4.8,
    reviews: 109,
    price: 0,
    topics: ["React", "Frontend Development", "UI/UX Implementation"],
    availability: ["Monday", "Wednesday", "Friday"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 7,
    name: "Robert Taylor",
    title: "Startup Advisor & Angel Investor",
    rating: 4.9,
    reviews: 143,
    price: 120,
    topics: ["Startup Strategy", "Fundraising", "Business Development"],
    availability: ["Tuesday", "Thursday"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 8,
    name: "Lisa Singh",
    title: "Project Management Expert",
    rating: 4.7,
    reviews: 92,
    price: 55,
    topics: ["Agile", "Scrum", "Project Delivery"],
    availability: ["Wednesday", "Friday", "Saturday"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 9,
    name: "James Wilson",
    title: "AI Research Scientist",
    rating: 4.8,
    reviews: 76,
    price: 95,
    topics: ["Artificial Intelligence", "Machine Learning", "Computer Vision"],
    availability: ["Tuesday", "Thursday", "Sunday"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 10,
    name: "Amanda Lewis",
    title: "Career Coach & HR Professional",
    rating: 4.9,
    reviews: 118,
    price: 70,
    topics: ["Career Development", "Resume Building", "Interview Preparation"],
    availability: ["Monday", "Wednesday", "Friday"],
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
];

// All expertise topics combined and deduplicated
const allTopics = Array.from(new Set(mentorData.flatMap(mentor => mentor.topics)));

// All days of the week for availability filtering
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function BrowseMentors() {
  // State for filtering and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 120]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const mentorsPerPage = 6;

  // Filter and sort mentors based on current filters
  const filteredMentors = mentorData.filter(mentor => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Topic filter
    const matchesTopics = selectedTopics.length === 0 || 
      selectedTopics.some(topic => mentor.topics.includes(topic));
    
    // Availability filter
    const matchesAvailability = selectedDays.length === 0 || 
      selectedDays.some(day => mentor.availability.includes(day));
    
    // Price filter
    const matchesPrice = (mentor.price >= priceRange[0] && mentor.price <= priceRange[1]);
    
    // Free only filter
    const matchesFree = !showFreeOnly || mentor.price === 0;
    
    return matchesSearch && matchesTopics && matchesAvailability && matchesPrice && matchesFree;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  const startIndex = (currentPage - 1) * mentorsPerPage;
  const endIndex = startIndex + mentorsPerPage;
  const currentMentors = filteredMentors.slice(startIndex, endIndex);

  // Handle topic selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
    setCurrentPage(1);
  };

  // Handle day selection
  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopics([]);
    setSelectedDays([]);
    setPriceRange([0, 120]);
    setShowFreeOnly(false);
    setSortBy("rating");
    setCurrentPage(1);
    toast("Filters have been reset");
  };

  // Update URL with filters (for shareable filtered views)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedTopics.length) params.set("topics", selectedTopics.join(","));
    if (selectedDays.length) params.set("days", selectedDays.join(","));
    if (priceRange[0] !== 0 || priceRange[1] !== 120) params.set("price", `${priceRange[0]}-${priceRange[1]}`);
    if (showFreeOnly) params.set("free", "true");
    if (sortBy !== "rating") params.set("sort", sortBy);
    if (currentPage !== 1) params.set("page", currentPage.toString());
    
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }, [searchQuery, selectedTopics, selectedDays, priceRange, showFreeOnly, sortBy, currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Browse Mentors</h1>
          <Button 
            variant="outline" 
            className="md:hidden flex items-center gap-2"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className={`${filtersVisible ? 'block' : 'hidden'} md:block md:w-1/4 bg-white p-4 rounded-lg border shadow-sm`}>
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search mentors..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              
              {/* Expertise */}
              <div>
                <h3 className="font-medium mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {allTopics.map((topic) => (
                    <Badge 
                      key={topic}
                      variant={selectedTopics.includes(topic) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTopic(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={120}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value as [number, number]);
                    setCurrentPage(1);
                  }}
                  className="my-4"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="freeOnly"
                    checked={showFreeOnly}
                    onChange={() => {
                      setShowFreeOnly(!showFreeOnly);
                      setCurrentPage(1);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="freeOnly" className="text-sm">Show only free mentors</label>
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Badge 
                      key={day}
                      variant={selectedDays.includes(day) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Mentors Listing */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                {filteredMentors.length} mentors found
              </p>
              
              <Tabs value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="rating">Top Rated</TabsTrigger>
                  <TabsTrigger value="price_low">Price: Low to High</TabsTrigger>
                  <TabsTrigger value="price_high">Price: High to Low</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Mentors Grid */}
            {currentMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMentors.map((mentor) => (
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
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.availability.map((day, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            <Calendar className="h-3 w-3 mr-1" />
                            {day.substring(0, 3)}
                          </Badge>
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No mentors found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to find more mentors</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    // Show first page, last page, and pages around current page
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    
                    // Show ellipsis
                    if (
                      (pageNumber === 2 && currentPage > 3) || 
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
