
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePayment } from "@/contexts/PaymentContext";
import { Check, CreditCard, UserCircle, Bell, Shield, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().optional(),
  notifications: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const Settings = () => {
  const { user, signOut } = useAuth();
  const { currentPlan } = usePayment();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<{ first_name: string | null, last_name: string | null } | null>(null);

  const defaultValues: Partial<ProfileFormValues> = {
    firstName: profileData?.first_name || "",
    lastName: profileData?.last_name || "",
    email: user?.email || "",
    bio: "",
    notifications: false
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .single();
        
        if (!error && data) {
          setProfileData(data);
          form.reset({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: user?.email || "",
            bio: "",
            notifications: false
          });
        }
      };

      fetchProfile();
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      // Update the profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
        })
        .eq("id", user?.id);

      if (error) throw error;

      setProfileData({
        first_name: data.firstName,
        last_name: data.lastName,
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initials = profileData
    ? `${profileData.first_name?.charAt(0) || ""}${profileData.last_name?.charAt(0) || ""}`
    : user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account information and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" alt={`${profileData?.first_name} ${profileData?.last_name}`} />
                      <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{profileData?.first_name} {profileData?.last_name}</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} disabled />
                            </FormControl>
                            <FormDescription>
                              Your email is used for login and notifications.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about yourself" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {currentPlan ? currentPlan : "Free Plan"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {currentPlan 
                            ? `Your current plan is ${currentPlan}`
                            : "Limited features available"
                          }
                        </p>
                      </div>
                      {currentPlan && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          <Check className="h-3 w-3" />
                          Active
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button variant={currentPlan ? "outline" : "default"}>
                    {currentPlan ? "Manage Subscription" : "Upgrade Plan"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you want to be notified.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications about new messages, session reminders, and updates.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Notification Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-gray-500">
                      Change your password to keep your account secure.
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  
                  <div className="pt-4 border-t space-y-2">
                    <h3 className="font-medium text-red-600">Danger Zone</h3>
                    <p className="text-sm text-gray-500">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="destructive">Delete Account</Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
