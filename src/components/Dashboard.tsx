
import { useState, useEffect } from 'react';
import { useWater } from '@/contexts/WaterContext';
import { WaterContainer } from './WaterContainer';
import { WaterAmountButton } from './WaterAmountButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Droplets, History, Bell, Settings, Trash2, 
  Plus, InfoIcon, CheckCircle, PlusCircle
} from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { 
    waterIntake, dailyGoal, totalIntake, progress, reminders,
    addWaterIntake, clearIntakeHistory, setDailyGoal, 
    addReminder, toggleReminder, removeReminder 
  } = useWater();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goalInputValue, setGoalInputValue] = useState(dailyGoal.toString());
  const [reminderTime, setReminderTime] = useState('09:00');
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSaveGoal = () => {
    const newGoal = parseInt(goalInputValue, 10);
    if (isNaN(newGoal) || newGoal <= 0) {
      toast({
        title: "Invalid goal",
        description: "Please enter a positive number.",
        variant: "destructive"
      });
      return;
    }
    
    setDailyGoal(newGoal);
    setIsGoalDialogOpen(false);
  };
  
  const handleAddReminder = () => {
    if (reminderTime) {
      addReminder(reminderTime);
      setReminderTime('');
    }
  };

  const handleTabChange = (value: string) => {
    // Create a tab switching animation
    setActiveTab('transitioning');
    
    setTimeout(() => {
      setActiveTab(value);
    }, 200);
  };
  
  // Calculate remaining amount
  const remaining = Math.max(0, dailyGoal - totalIntake);
  
  // Format the time to 12-hour format with AM/PM
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  return (
    <div className={`container max-w-md mx-auto px-4 py-8 transition-opacity duration-200 ${activeTab === 'transitioning' ? 'opacity-0' : 'opacity-100'}`}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-1">Water Reminder</h1>
        <p className="text-gray-500 text-sm">Stay hydrated, stay healthy</p>
      </header>
      
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-4 gap-1 mb-6 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Droplets className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <History className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="reminders" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bell className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="col-span-1">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Daily Goal</div>
                <div className="text-2xl font-bold">{dailyGoal}ml</div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">Remaining</div>
                <div className="text-2xl font-bold">{remaining}ml</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <WaterContainer className="h-64 w-full mb-4" showPercentage />
          </div>
          
          <WaterAmountButton />
          
          <p className="text-sm text-center mt-6 text-gray-500">
            You've consumed {totalIntake}ml so far today
          </p>
        </TabsContent>
        
        <TabsContent value="history" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Today's Intake
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={clearIntakeHistory}
                  className="h-8 w-8 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Your water intake for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {waterIntake.length > 0 ? (
                <div className="space-y-4">
                  {waterIntake.map((intake) => (
                    <div 
                      key={intake.id} 
                      className="flex items-center p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Droplets className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">{intake.amount}ml</div>
                        <div className="text-xs text-gray-500">
                          {intake.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Droplets className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No intake recorded yet.</p>
                  <p className="text-sm">Start drinking water!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reminders" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>
                Set reminders to stay hydrated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddReminder} className="flex-shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {reminders.length > 0 ? (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div 
                      key={reminder.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Bell className={`h-5 w-5 ${reminder.active ? 'text-blue-500' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <div className="font-medium">{formatTime(reminder.time)}</div>
                          <div className="text-xs text-gray-500">
                            {reminder.active ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={reminder.active}
                          onCheckedChange={() => toggleReminder(reminder.id)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeReminder(reminder.id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No reminders set.</p>
                  <p className="text-sm">Add your first reminder!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Customize your water tracking experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Daily Water Goal</div>
                    <div className="text-sm text-gray-500">{dailyGoal}ml</div>
                  </div>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change</Button>
                  </DialogTrigger>
                </div>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set Daily Water Goal</DialogTitle>
                    <DialogDescription>
                      The recommended amount is 2000-3000ml per day.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input
                      type="number"
                      value={goalInputValue}
                      onChange={(e) => setGoalInputValue(e.target.value)}
                      className="w-full"
                      placeholder="Enter goal in ml"
                    />
                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                      <button 
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setGoalInputValue("2000")}
                      >
                        2000ml
                      </button>
                      <button 
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setGoalInputValue("2500")}
                      >
                        2500ml
                      </button>
                      <button 
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setGoalInputValue("3000")}
                      >
                        3000ml
                      </button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSaveGoal}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-sm font-medium">Reset History</div>
                  <div className="text-sm text-gray-500">Clear all intake data</div>
                </div>
                <Button 
                  variant="outline" 
                  className="text-red-500 border-red-200 hover:bg-red-50"
                  onClick={clearIntakeHistory}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Water Reminder helps you stay hydrated by tracking your
                daily water intake and sending you timely reminders.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Version 1.0.0
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
