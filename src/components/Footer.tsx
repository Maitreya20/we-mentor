
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">WeMentor</h3>
            <p className="text-gray-600 mb-4">
              Connecting mentors and mentees for meaningful growth and development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">For Mentees</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-gray-600 hover:text-blue-600">Find a Mentor</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link></li>
              <li><Link to="/success-stories" className="text-gray-600 hover:text-blue-600">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">For Mentors</h3>
            <ul className="space-y-2">
              <li><Link to="/become-mentor" className="text-gray-600 hover:text-blue-600">Become a Mentor</Link></li>
              <li><Link to="/mentor-resources" className="text-gray-600 hover:text-blue-600">Resources</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-blue-600">Community</Link></li>
              <li><Link to="/mentor-faqs" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WeMentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
