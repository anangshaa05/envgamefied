import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/Card";
import LevelPill from "@/components/LevelPill";
import { leaderboard } from "@/data/mockData";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("all-time");
  
  // Sort leaderboard by rank
  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-badge-gold" />;
      case 2: return <Medal className="w-5 h-5 text-badge-silver" />;
      case 3: return <Medal className="w-5 h-5 text-badge-bronze" />;
      default: return <span className="text-muted-foreground font-medium">#{rank}</span>;
    }
  };

  const getRankColors = (rank) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"; 
      case 3: return "bg-gradient-to-r from-orange-300 to-orange-500 text-white";
      default: return "bg-card border border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-badge-gold" />
            <h1 className="text-3xl font-bold text-foreground">Eco Leaders</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrate the top environmental champions making a real difference! 
            Compete, contribute, and climb the ranks. 🏆
          </p>
        </motion.div>

        {/* Time Frame Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <Tabs value={timeFrame} onValueChange={setTimeFrame} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="order-1 md:order-1"
            >
              <Card className={`p-6 text-center ${getRankColors(2)} shadow-hover`}>
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-soft">
                    <img 
                      src={topThree[1]?.avatarUrl}
                      alt={topThree[1]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <Medal className="w-6 h-6 text-badge-silver mr-1" />
                    <span className="font-bold">2nd Place</span>
                  </div>
                  <h3 className="font-bold text-lg">{topThree[1]?.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{topThree[1]?.points.toLocaleString()}</div>
                  <div className="text-sm opacity-80">Eco Points</div>
                  <LevelPill level={topThree[1]?.level} size="sm" />
                </div>
              </Card>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="order-2 md:order-2"
            >
              <Card className={`p-8 text-center ${getRankColors(1)} shadow-hover transform scale-105`}>
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-soft">
                    <img 
                      src={topThree[0]?.avatarUrl}
                      alt={topThree[0]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <Crown className="w-8 h-8 text-yellow-300 mr-2" />
                    <span className="font-bold text-lg">Champion</span>
                  </div>
                  <h3 className="font-bold text-xl">{topThree[0]?.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">{topThree[0]?.points.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Eco Points</div>
                  <LevelPill level={topThree[0]?.level} size="md" />
                  <Badge variant="secondary" className="bg-white/20">
                    {topThree[0]?.badgeCount} Badges
                  </Badge>
                </div>
              </Card>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="order-3 md:order-3"
            >
              <Card className={`p-6 text-center ${getRankColors(3)} shadow-hover`}>
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-soft">
                    <img 
                      src={topThree[2]?.avatarUrl}
                      alt={topThree[2]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <Medal className="w-6 h-6 text-badge-bronze mr-1" />
                    <span className="font-bold">3rd Place</span>
                  </div>
                  <h3 className="font-bold text-lg">{topThree[2]?.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{topThree[2]?.points.toLocaleString()}</div>
                  <div className="text-sm opacity-80">Eco Points</div>
                  <LevelPill level={topThree[2]?.level} size="sm" />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Full Leaderboard */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="default" className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Full Rankings</h2>
            </div>
            
            <div className="divide-y divide-border">
              {sortedLeaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 hover:bg-muted/50 transition-colors ${
                    user.rank <= 3 ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="w-12 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border shadow-soft">
                      <img 
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <LevelPill level={user.level} size="sm" />
                        {user.badgeCount > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {user.badgeCount} badges
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>

                    {/* Trend Indicator (mock) */}
                    <div className="w-6">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card variant="default" className="p-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Climb the Leaderboard!</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Complete more challenges, learn new lessons, and engage with the community to boost your ranking!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Take Challenges
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Join Community
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Leaderboard;