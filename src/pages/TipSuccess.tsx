import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";

const TipSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chefId = searchParams.get("chef") || "1";
  const amount = searchParams.get("amount") || "0";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="pt-12 pb-8 px-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-serif font-bold mb-2"
                >
                  Thank You!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6"
                >
                  Your tip of <span className="text-primary font-semibold">${amount}</span> has been sent successfully!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-red-400 mb-8"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="text-sm">Your support means the world to the chef!</span>
                  <Heart className="w-5 h-5 fill-current" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate(`/chef/${chefId}`)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Chef Profile
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate("/chefs")}
                  >
                    Discover More Chefs
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TipSuccess;
