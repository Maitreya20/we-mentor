
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">WeMentor</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search mentors..." className="pl-10" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/browse" className="text-gray-600 hover:text-blue-600">Browse Mentors</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex items-center mb-4">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <Input type="text" placeholder="Search mentors..." className="w-full" />
          </div>
          <div className="flex flex-col space-y-4">
            <Link to="/browse" className="text-gray-600 py-2 hover:text-blue-600">Browse Mentors</Link>
            <Link to="/how-it-works" className="text-gray-600 py-2 hover:text-blue-600">How It Works</Link>
            <Link to="/pricing" className="text-gray-600 py-2 hover:text-blue-600">Pricing</Link>
            <Link to="/login">
              <Button variant="outline" className="w-full mb-2">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
