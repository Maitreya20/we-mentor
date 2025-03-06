
import { useEffect, useState } from 'react';
import { WaterProvider } from '@/contexts/WaterContext';
import Dashboard from '@/components/Dashboard';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // After initial mount, set mounted to true to trigger animations
  useEffect(() => {
    setMounted(true);

    // Add meta viewport for better mobile experience
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <WaterProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        
        <div className={`transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Dashboard />
        </div>

        <Toaster position="bottom-center" />
      </div>
    </WaterProvider>
  );
};

export default Index;
