
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type WaterIntake = {
  id: string;
  amount: number; // in ml
  timestamp: Date;
};

type Reminder = {
  id: string;
  time: string;
  active: boolean;
};

type WaterContextType = {
  waterIntake: WaterIntake[];
  dailyGoal: number;
  totalIntake: number;
  progress: number;
  reminders: Reminder[];
  addWaterIntake: (amount: number) => void;
  clearIntakeHistory: () => void;
  setDailyGoal: (amount: number) => void;
  addReminder: (time: string) => void;
  toggleReminder: (id: string) => void;
  removeReminder: (id: string) => void;
};

const WaterContext = createContext<WaterContextType | undefined>(undefined);

export const WaterProvider = ({ children }: { children: React.ReactNode }) => {
  const [waterIntake, setWaterIntake] = useState<WaterIntake[]>(() => {
    const savedIntake = localStorage.getItem('waterIntake');
    if (savedIntake) {
      try {
        const parsed = JSON.parse(savedIntake);
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      } catch (e) {
        console.error('Failed to parse water intake data:', e);
        return [];
      }
    }
    return [];
  });
  
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    const savedGoal = localStorage.getItem('dailyGoal');
    return savedGoal ? parseInt(savedGoal, 10) : 2500;
  });
  
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [
      { id: '1', time: '09:00', active: true },
      { id: '2', time: '12:00', active: true },
      { id: '3', time: '15:00', active: true },
      { id: '4', time: '18:00', active: true }
    ];
  });
  
  // Filter only today's intake
  const todaysIntake = waterIntake.filter(item => {
    const today = new Date();
    const itemDate = new Date(item.timestamp);
    return (
      itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
    );
  });
  
  // Calculate total intake for today
  const totalIntake = todaysIntake.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate progress percentage
  const progress = Math.min(Math.round((totalIntake / dailyGoal) * 100), 100);

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal.toString());
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addWaterIntake = (amount: number) => {
    const newIntake: WaterIntake = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date()
    };
    
    setWaterIntake(prev => [...prev, newIntake]);
    
    if (totalIntake + amount >= dailyGoal && totalIntake < dailyGoal) {
      toast({
        title: "Daily goal reached! 🎉",
        description: "Congratulations on staying hydrated today!",
      });
    }
  };

  const clearIntakeHistory = () => {
    if (confirm('Are you sure you want to clear your intake history?')) {
      setWaterIntake([]);
      toast({
        title: "History cleared",
        description: "Your water intake history has been reset.",
      });
    }
  };

  const updateDailyGoal = (amount: number) => {
    setDailyGoal(amount);
    toast({
      title: "Daily goal updated",
      description: `Your daily goal is now ${amount}ml.`,
    });
  };

  const addReminder = (time: string) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      time,
      active: true
    };
    
    setReminders(prev => [...prev, newReminder]);
    toast({
      title: "Reminder set",
      description: `You'll be reminded to drink water at ${time}.`,
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, active: !reminder.active } 
          : reminder
      )
    );
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <WaterContext.Provider
      value={{
        waterIntake: todaysIntake,
        dailyGoal,
        totalIntake,
        progress,
        reminders,
        addWaterIntake,
        clearIntakeHistory,
        setDailyGoal: updateDailyGoal,
        addReminder,
        toggleReminder,
        removeReminder,
      }}
    >
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = () => {
  const context = useContext(WaterContext);
  if (context === undefined) {
    throw new Error('useWater must be used within a WaterProvider');
  }
  return context;
};
