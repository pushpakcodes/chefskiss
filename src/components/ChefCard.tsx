import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Heart, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface ChefCardProps {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  totalTips: number;
  followers: number;
  index?: number;
}

export function ChefCard({
  id,
  name,
  specialty,
  avatar,
  rating,
  totalTips,
  followers,
  index = 0,
}: ChefCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card variant="glass" className="group overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Avatar className="w-16 h-16 border-2 border-primary/30">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="bg-primary/20 text-primary font-serif text-xl">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-semibold truncate group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {specialty}
              </p>
              <div className="mt-2">
                <StarRating rating={rating} size="sm" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="w-4 h-4 text-red-400" />
              <span>{followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">{totalTips.toLocaleString()} tips</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link to={`/chef/${id}`}>View Profile</Link>
            </Button>
            <Button variant="gradient" className="flex-1" asChild>
              <Link to={`/chef/${id}/tip`}>
                <DollarSign className="w-4 h-4" />
                Tip
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
