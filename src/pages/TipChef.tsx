import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Heart, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const tipAmounts = [5, 10, 25, 50, 100];

const TipChef = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const chefData = {
    name: "Chef Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150",
    specialty: "Modern Asian Fusion",
  };

  const handleTip = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error("Please select or enter a tip amount");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-tip-payment", {
        body: {
          amount,
          chefId: id,
          chefName: chefData.name,
          message,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in the same tab
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Failed to process payment. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            {/* Chef Info */}
            <Card variant="glass" className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/30">
                    <AvatarImage src={chefData.avatar} alt={chefData.name} />
                    <AvatarFallback className="bg-primary/20 text-primary font-serif text-xl">
                      {chefData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-serif font-semibold">
                      {chefData.name}
                    </h2>
                    <p className="text-muted-foreground">{chefData.specialty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tip Card */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Send a Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {tipAmounts.map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`py-3 rounded-xl font-semibold transition-all ${
                          selectedAmount === amount
                            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        ${amount}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="pl-11"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Add a Message (Optional)
                  </label>
                  <Textarea
                    placeholder="Share your appreciation..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Payment Summary */}
                <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Tip Amount</span>
                    <span className="font-semibold">
                      ${selectedAmount || customAmount || "0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  onClick={handleTip}
                  disabled={isProcessing || (!selectedAmount && !customAmount)}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirecting to Checkout...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Send Tip
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  100% of your tip goes directly to the chef. Secure payment
                  processing.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TipChef;
