import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface WaterLogEntry {
  amount: number;
  timestamp: string;
  type?: string;
}

interface WaterContextType {
  dailyIntake: number;
  dailyGoal: number;
  progress: number;
  waterLog: WaterLogEntry[];
  addWaterIntake: (amount: number, type?: string) => void;
  resetDailyIntake: () => void;
  setGoal: (goal: number) => void;
}

const DEFAULT_DAILY_GOAL = 2000; // 2000ml or 2 liters

const WaterContext = createContext<WaterContextType | undefined>(undefined);

export function WaterProvider({ children }: { children: ReactNode }) {
  const [dailyIntake, setDailyIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(DEFAULT_DAILY_GOAL);
  const [waterLog, setWaterLog] = useState<WaterLogEntry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  
  // Calculate progress as a percentage
  const progress = Math.min(Math.round((dailyIntake / dailyGoal) * 100), 100);
  
  // Load saved water data from localStorage on component mount
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const savedDate = localStorage.getItem("water_date");
    const savedGoal = localStorage.getItem("water_goal");
    
    // If it's a new day, reset the intake
    if (savedDate !== today) {
      localStorage.setItem("water_date", today);
      localStorage.setItem("water_intake", "0");
      localStorage.setItem("water_log", JSON.stringify([]));
      setDailyIntake(0);
      setWaterLog([]);
    } else {
      // Otherwise load the saved data
      const savedIntake = localStorage.getItem("water_intake");
      const savedLog = localStorage.getItem("water_log");
      
      if (savedIntake) setDailyIntake(parseInt(savedIntake));
      if (savedLog) setWaterLog(JSON.parse(savedLog));
    }
    
    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    setCurrentDate(today);
  }, []);
  
  // Add water intake
  const addWaterIntake = (amount: number, type?: string) => {
    const newIntake = dailyIntake + amount;
    const newEntry: WaterLogEntry = {
      amount,
      timestamp: new Date().toISOString(),
      type
    };
    
    const newLog = [newEntry, ...waterLog];
    
    setDailyIntake(newIntake);
    setWaterLog(newLog);
    
    // Save to localStorage
    localStorage.setItem("water_intake", newIntake.toString());
    localStorage.setItem("water_log", JSON.stringify(newLog));
    
    // Show toast notification
    toast.success(`Added ${amount}ml of water!`, {
      description: progress >= 100 
        ? "You've reached your daily goal! 🎉" 
        : `Progress: ${progress}% of daily goal`,
      duration: 3000,
    });
  };
  
  // Reset daily intake
  const resetDailyIntake = () => {
    setDailyIntake(0);
    setWaterLog([]);
    localStorage.setItem("water_intake", "0");
    localStorage.setItem("water_log", JSON.stringify([]));
  };
  
  // Set daily goal
  const setGoal = (goal: number) => {
    setDailyGoal(goal);
    localStorage.setItem("water_goal", goal.toString());
  };
  
  // Check for day change
  useEffect(() => {
    const checkDate = () => {
      const today = new Date().toLocaleDateString();
      if (currentDate !== today) {
        resetDailyIntake();
        setCurrentDate(today);
        localStorage.setItem("water_date", today);
      }
    };
    
    // Check date every minute
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);
  
  const value = {
    dailyIntake,
    dailyGoal,
    progress,
    waterLog,
    addWaterIntake,
    resetDailyIntake,
    setGoal
  };
  
  return <WaterContext.Provider value={value}>{children}</WaterContext.Provider>;
}

// Custom hook to use the water context
export function useWater() {
  const context = useContext(WaterContext);
  if (context === undefined) {
    throw new Error("useWater must be used within a WaterProvider");
  }
  return context;
}
