
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useWater } from '@/contexts/WaterContext';
import { Droplets } from 'lucide-react';

type WaterContainerProps = {
  className?: string;
  showPercentage?: boolean;
};

export const WaterContainer = ({
  className,
  showPercentage = false
}: WaterContainerProps) => {
  const { progress } = useWater();
  const [displayProgress, setDisplayProgress] = useState(0);
  const animationFrameRef = useRef<number>();
  
  useEffect(() => {
    let startTimestamp: number;
    const duration = 1000; // Animation duration in ms
    const startValue = displayProgress;
    const changeInValue = progress - startValue;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      if (elapsed < duration) {
        // Easing function for smooth animation
        const t = elapsed / duration;
        const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        
        setDisplayProgress(Math.round(startValue + changeInValue * easedT));
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayProgress(progress);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(step);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress]);
  
  return (
    <div 
      className={cn(
        "water-container relative rounded-3xl overflow-hidden bg-blue-50 shadow-lg transition-all duration-300",
        className
      )}
    >
      <div 
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-water-400 to-water-300 water-fill"
        style={{ 
          height: `${displayProgress}%`,
          transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="water-wave front animate-wave"></div>
        <div className="water-wave back animate-wave"></div>
      </div>
      
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white mix-blend-difference">
          <Droplets className="h-8 w-8 mb-2 animate-pulse" />
          <div className="text-4xl font-bold tracking-tighter">{displayProgress}%</div>
          <div className="text-sm font-medium opacity-80">of daily goal</div>
        </div>
      )}
    </div>
  );
};
