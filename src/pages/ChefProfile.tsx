import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarRating } from "@/components/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Heart, MapPin, Award, Camera, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock chef data
const chefData = {
  id: "1",
  name: "Chef Marcus Chen",
  specialty: "Modern Asian Fusion",
  avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300",
  coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
  bio: "Michelin-starred chef with 15 years of experience blending traditional Asian techniques with modern culinary innovation. My journey started in Hong Kong and has taken me through kitchens in Tokyo, Paris, and New York.",
  location: "New York, NY",
  rating: 4.9,
  totalReviews: 248,
  totalTips: 1247,
  followers: 8420,
  awards: ["Michelin Star 2023", "James Beard Nominee", "Best Asian Fusion NYC"],
  gallery: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400",
  ],
  reviews: [
    {
      id: "1",
      user: "Sarah M.",
      rating: 5,
      comment: "Absolutely incredible experience! Chef Marcus's fusion creations are mind-blowing.",
      date: "2 days ago",
    },
    {
      id: "2",
      user: "James K.",
      rating: 5,
      comment: "The attention to detail is unmatched. Every dish tells a story.",
      date: "1 week ago",
    },
    {
      id: "3",
      user: "Emily R.",
      rating: 4,
      comment: "Wonderful flavors and beautiful presentation. Will definitely be back!",
      date: "2 weeks ago",
    },
  ],
};

const ChefProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={chefData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-24 relative z-10">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8"
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-2xl">
              <AvatarImage src={chefData.avatar} alt={chefData.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-serif text-4xl">
                {chefData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                {chefData.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                {chefData.specialty}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {chefData.location}
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={chefData.rating} size="sm" />
                  <span>({chefData.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  {chefData.followers.toLocaleString()} followers
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
              <Button variant="gradient" asChild>
                <Link to={`/chef/${id}/tip`}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Send Tip
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Bio & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card variant="glass" className="md:col-span-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {chefData.bio}
                </p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {chefData.awards.map((award, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {award}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {chefData.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-square rounded-2xl overflow-hidden group"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="max-w-2xl mx-auto space-y-4">
                  {chefData.reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card variant="glass">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{review.user}</h4>
                              <p className="text-sm text-muted-foreground">
                                {review.date}
                              </p>
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <p className="text-muted-foreground">
                            {review.comment}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChefProfile;
