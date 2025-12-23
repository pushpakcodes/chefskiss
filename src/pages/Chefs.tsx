import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChefCard } from "@/components/ChefCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trophy, Crown, Medal, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Chef {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  totalTips: number;
  followers: number;
}

interface LeaderboardChef {
  chef_id: string;
  full_name: string;
  specialty: string;
  avatar_url: string;
  total_tips: number;
  tip_count: number;
}

const specialties = ["All", "Asian", "French", "Italian", "Mexican", "BBQ", "Japanese", "Pastry"];

const Chefs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardChef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChefs();
    fetchLeaderboard();
  }, []);

  const fetchChefs = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "chef");

    if (error) {
      console.error("Error fetching chefs:", error);
      setLoading(false);
      return;
    }

    const formattedChefs: Chef[] = (data || []).map((chef) => ({
      id: chef.id,
      name: chef.full_name || "Anonymous Chef",
      specialty: chef.specialty || "Various Cuisines",
      avatar: chef.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chef.id}`,
      rating: 4.5 + Math.random() * 0.5,
      totalTips: Math.floor(Math.random() * 1000),
      followers: Math.floor(Math.random() * 5000),
    }));

    setChefs(formattedChefs);
    setLoading(false);
  };

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.rpc("get_chef_leaderboard", { limit_count: 5 });

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return;
    }

    setLeaderboard(data || []);
  };

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      chef.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Discover <span className="text-gradient-gold">Amazing Chefs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our curated collection of talented chefs and show your
              appreciation.
            </p>
          </motion.div>

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Card variant="glass" className="border-primary/20">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Trophy className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl">Top Tipped Chefs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {leaderboard.map((chef, index) => (
                      <motion.div
                        key={chef.chef_id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`flex flex-col items-center p-4 rounded-xl ${
                          index === 0 ? "bg-primary/10 border border-primary/30" : "bg-secondary/30"
                        }`}
                      >
                        <div className="mb-2">{getRankIcon(index)}</div>
                        <Avatar className={`w-16 h-16 border-2 ${index === 0 ? "border-primary" : "border-border"}`}>
                          <AvatarImage src={chef.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chef.chef_id}`} />
                          <AvatarFallback>{chef.full_name?.charAt(0) || "C"}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-sm mt-2 text-center truncate w-full">
                          {chef.full_name || "Chef"}
                        </h3>
                        <p className="text-xs text-muted-foreground">{chef.specialty || "Various"}</p>
                        <p className="text-primary font-bold mt-1">${chef.total_tips?.toFixed(0) || 0}</p>
                        <p className="text-xs text-muted-foreground">{chef.tip_count || 0} tips</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search chefs or specialties..."
                className="pl-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "gradient" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Chef Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChefs.map((chef, index) => (
                <ChefCard key={chef.id} {...chef} index={index} />
              ))}
            </div>
          )}

          {!loading && filteredChefs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg mb-4">
                No chefs found matching your search.
              </p>
              <p className="text-sm text-muted-foreground">
                Be the first chef to join! <a href="/register" className="text-primary hover:underline">Register as a chef</a>
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chefs;
