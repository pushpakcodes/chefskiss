import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface FeedPostProps {
  id: string;
  chef: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  timestamp: string;
  index?: number;
}

export function FeedPost({
  chef,
  content,
  image,
  likes: initialLikes,
  comments,
  timestamp,
  index = 0,
}: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card variant="glass" className="overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-primary/20">
            <AvatarImage src={chef.avatar} alt={chef.name} />
            <AvatarFallback className="bg-primary/20 text-primary font-serif">
              {chef.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{chef.name}</h4>
            <p className="text-xs text-muted-foreground">{timestamp}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-sm text-foreground/90">{content}</p>
        </div>

        {/* Media */}
        {image && (
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={image}
              alt="Post"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="p-4 flex items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span>{likes}</span>
          </motion.button>

          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>

          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
