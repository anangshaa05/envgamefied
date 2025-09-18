import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/Card";
import LevelPill from "@/components/LevelPill";
import { leaderboard, user } from "@/data/mockData";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("all-time");
  
  // Sort leaderboard by rank
  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);
  
  // Find current user's position
  const currentUser = leaderboard.find(u => u.id === user.id);

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
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-end justify-center gap-8">
              {/* Second Place - Left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center mt-8"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 bg-blue-400/20 p-1">
                    <img 
                      src={topThree[1]?.avatarUrl}
                      alt={topThree[1]?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{topThree[1]?.name}</h3>
                <div className="text-2xl font-bold text-blue-400 mb-1">{topThree[1]?.points.toLocaleString()}</div>
                <div className="text-sm text-slate-400">@username</div>
              </motion.div>

              {/* First Place - Center (Elevated) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-4">
                  <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 bg-yellow-400/20 p-1">
                    <img 
                      src={topThree[0]?.avatarUrl}
                      alt={topThree[0]?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-white mb-1">{topThree[0]?.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{topThree[0]?.points.toLocaleString()}</div>
                <div className="text-sm text-slate-400">@username</div>
              </motion.div>

              {/* Third Place - Right */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center mt-8"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-400 bg-green-400/20 p-1">
                    <img 
                      src={topThree[2]?.avatarUrl}
                      alt={topThree[2]?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{topThree[2]?.name}</h3>
                <div className="text-2xl font-bold text-green-400 mb-1">{topThree[2]?.points.toLocaleString()}</div>
                <div className="text-sm text-slate-400">@username</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Current User Position */}
        {currentUser && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card variant="default" className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 flex justify-center">
                  <span className="text-primary font-bold">#{currentUser.rank}</span>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-soft">
                  <img 
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-foreground">{currentUser.name} (You)</h3>
                    <LevelPill level={currentUser.level} size="sm" />
                    <Badge variant="outline" className="text-xs">
                      {currentUser.badgeCount} badges
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {currentUser.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Full Leaderboard */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
                  } ${user.id === currentUser?.id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
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
          transition={{ delay: 0.9 }}
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