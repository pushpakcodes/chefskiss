import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { TipsChart } from "@/components/TipsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Bell,
  Settings,
  Plus,
  Camera,
  History,
  ChefHat,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Tip {
  id: string;
  amount: number;
  message: string | null;
  created_at: string;
  status: string;
  chef_id: string;
  tipper_id: string | null;
  chef_name?: string;
  tipper_name?: string;
}

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  specialty: string | null;
  avatar_url: string | null;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayTips: 0,
    weeklyTips: 0,
    totalTips: 0,
    tipCount: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      fetchProfile();
      fetchTips();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
    }
  };

  const fetchTips = async () => {
    if (!user) return;

    // First get the user's profile to get their profile id
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!profileData) {
      setLoading(false);
      return;
    }

    let query;
    
    if (profileData.role === "chef") {
      // Chef sees tips they received
      query = supabase
        .from("tips")
        .select("*")
        .eq("chef_id", profileData.id)
        .order("created_at", { ascending: false })
        .limit(20);
    } else {
      // Customer sees tips they sent
      query = supabase
        .from("tips")
        .select("*")
        .eq("tipper_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching tips:", error);
    } else {
      setTips(data || []);
      calculateStats(data || [], profileData.role);
    }

    setLoading(false);
  };

  const calculateStats = (tipData: Tip[], role: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedTips = tipData.filter((t) => t.status === "completed");
    
    const todayTips = completedTips
      .filter((t) => new Date(t.created_at) >= today)
      .reduce((sum, t) => sum + t.amount, 0);

    const weeklyTips = completedTips
      .filter((t) => new Date(t.created_at) >= weekAgo)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalTips = completedTips.reduce((sum, t) => sum + t.amount, 0);

    setStats({
      todayTips,
      weeklyTips,
      totalTips,
      tipCount: completedTips.length,
    });
  };

  const chartData = [
    { name: "Mon", tips: 12, amount: 145 },
    { name: "Tue", tips: 18, amount: 234 },
    { name: "Wed", tips: 15, amount: 189 },
    { name: "Thu", tips: 22, amount: 298 },
    { name: "Fri", tips: 28, amount: 356 },
    { name: "Sat", tips: 35, amount: 445 },
    { name: "Sun", tips: 20, amount: 267 },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isChef = profile?.role === "chef";

  const dashboardStats = [
    {
      title: isChef ? "Today's Earnings" : "Today's Tips",
      value: `$${stats.todayTips.toFixed(0)}`,
      change: "Today's activity",
      changeType: "neutral" as const,
      icon: DollarSign,
    },
    {
      title: isChef ? "Weekly Earnings" : "Weekly Tips",
      value: `$${stats.weeklyTips.toFixed(0)}`,
      change: "Last 7 days",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: isChef ? "Total Earnings" : "Total Tipped",
      value: `$${stats.totalTips.toFixed(0)}`,
      change: `${stats.tipCount} tips total`,
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Account Type",
      value: isChef ? "Chef" : "Customer",
      change: profile?.specialty || "Member",
      changeType: "neutral" as const,
      icon: isChef ? ChefHat : Star,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                <AvatarFallback className="bg-primary/20 text-primary text-xl">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-1">
                  Welcome back, <span className="text-gradient-gold">{profile?.full_name || "Chef"}</span>
                </h1>
                <p className="text-muted-foreground">
                  {isChef ? "Here's what's happening with your tips today." : "Track your tipping activity."}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              {isChef && (
                <Button variant="gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              )}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} index={index} />
            ))}
          </div>

          {/* Charts & Tip History */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <TipsChart data={chartData} title="Weekly Tipping Overview" />
            </div>

            {/* Tip History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="glass" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <History className="w-5 h-5" />
                    {isChef ? "Recent Tips Received" : "Your Tip History"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tips.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No tips yet.</p>
                      {!isChef && (
                        <Button variant="link" asChild className="mt-2">
                          <Link to="/chefs">Find chefs to tip</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    tips.slice(0, 5).map((tip, index) => (
                      <motion.div
                        key={tip.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-primary/10">
                          <DollarSign className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">
                              {tip.status === "completed" ? "Completed" : "Pending"}
                            </span>
                            <span className="text-primary font-bold">${tip.amount}</span>
                          </div>
                          {tip.message && (
                            <p className="text-xs text-muted-foreground truncate">
                              "{tip.message}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {format(new Date(tip.created_at), "MMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {isChef ? (
              <>
                <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload Content</h3>
                      <p className="text-sm text-muted-foreground">
                        Share photos or reels
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">View Reviews</h3>
                      <p className="text-sm text-muted-foreground">
                        See what customers say
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Withdraw Tips</h3>
                      <p className="text-sm text-muted-foreground">
                        Transfer to your bank
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Link to="/chefs">
                  <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <ChefHat className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Discover Chefs</h3>
                        <p className="text-sm text-muted-foreground">
                          Find new chefs to support
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/feed">
                  <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Browse Feed</h3>
                        <p className="text-sm text-muted-foreground">
                          See latest chef posts
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card variant="glass" className="group hover:border-primary/30 transition-colors cursor-pointer">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <History className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tip History</h3>
                      <p className="text-sm text-muted-foreground">
                        View all your past tips
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
