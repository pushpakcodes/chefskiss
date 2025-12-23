import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeedPost } from "@/components/FeedPost";

const feedPosts = [
  {
    id: "1",
    chef: {
      name: "Chef Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150",
    },
    content: "Just finished plating this beautiful Wagyu beef with truffle foam. The secret is in the temperature control! 🔥",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    chef: {
      name: "Chef Isabella Rose",
      avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150",
    },
    content: "Today's special: Raspberry macarons with white chocolate ganache. Perfection takes patience! 💕",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800",
    likes: 456,
    comments: 67,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    chef: {
      name: "Chef David Park",
      avatar: "https://images.unsplash.com/photo-1583394293214-28eze9e0eb?w=150",
    },
    content: "Behind the scenes at my kitchen - preparing for tonight's tasting menu. 12 courses of pure Korean heritage with a modern twist.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    likes: 189,
    comments: 23,
    timestamp: "8 hours ago",
  },
  {
    id: "4",
    chef: {
      name: "Chef Maria Santos",
      avatar: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=150",
    },
    content: "Fresh handmade tortillas are the foundation of everything. My grandmother taught me this, and I'm passing it on! 🌮",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800",
    likes: 312,
    comments: 54,
    timestamp: "1 day ago",
  },
];

const Feed = () => {
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
              Chef <span className="text-gradient-gold">Social Feed</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected with your favorite chefs and discover their latest
              culinary creations.
            </p>
          </motion.div>

          {/* Feed */}
          <div className="max-w-2xl mx-auto space-y-6">
            {feedPosts.map((post, index) => (
              <FeedPost key={post.id} {...post} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feed;
