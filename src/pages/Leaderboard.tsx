import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, Users, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Card from "@/components/Card";
import LevelPill from "@/components/LevelPill";
import { useToast } from "@/hooks/use-toast";
import { leaderboard, user } from "@/data/mockData";
import graduationCapIcon from "@/assets/graduation-cap.svg";
import instituteIcon from "@/assets/institute-icon.svg";
const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "friends" | "region">("all");
  const {
    toast
  } = useToast();
  
  // Find current user's position first
  const currentUser = leaderboard.find(u => u.id === user.id);
  
  const filteredLeaderboard = leaderboard.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || 
      (filterType === "friends" && user.classId === currentUser?.classId) ||
      (filterType === "region" && user.instituteId === currentUser?.instituteId);
    return matchesSearch && matchesFilter;
  });
  
  const handleFollowUser = (userName: string) => {
    toast({
      title: "Following User",
      description: `You are now following ${userName}!`
    });
  };
  const [timeFrame, setTimeFrame] = useState("all-time");

  // Sort leaderboard by rank
  const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => a.rank - b.rank);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);
  const getRankIcon = rank => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-badge-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-badge-silver" />;
      case 3:
        return <Medal className="w-5 h-5 text-badge-bronze" />;
      default:
        return <span className="text-muted-foreground font-medium">#{rank}</span>;
    }
  };
  const getRankColors = rank => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
      case 3:
        return "bg-gradient-to-r from-orange-300 to-orange-500 text-white";
      default:
        return "bg-card border border-border";
    }
  };
  return <TooltipProvider>
      <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-8 text-center">
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
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="mb-8 flex justify-center">
          <Tabs value={timeFrame} onValueChange={setTimeFrame} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Search and Filter */}
        <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search eco-warriors..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Badge variant={filterType === "all" ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setFilterType("all")}>
                All
              </Badge>
              <Badge variant={filterType === "friends" ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setFilterType("friends")}>My Class</Badge>
              <Badge variant={filterType === "region" ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setFilterType("region")}>My School</Badge>
            </div>
          </div>
        </motion.section>
        <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="mb-12">
          <div className="bg-white rounded-2xl p-10 max-w-5xl mx-auto shadow-card border border-border">
            <div className="flex items-end justify-center gap-12">
              {/* Second Place - Left */}
              <motion.div initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="flex flex-col items-center mt-8">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-badge-silver bg-badge-silver/20 p-1">
                    <img src={topThree[1]?.avatarUrl} alt={topThree[1]?.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-badge-silver rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-1">{topThree[1]?.name}</h3>
                <div className="text-3xl font-bold text-badge-silver mb-1">{topThree[1]?.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">@username</div>
              </motion.div>

              {/* First Place - Center (Elevated) */}
              <motion.div initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Crown className="w-10 h-10 text-badge-gold mx-auto mb-2" />
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-badge-gold bg-badge-gold/20 p-1">
                    <img src={topThree[0]?.avatarUrl} alt={topThree[0]?.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h3 className="font-bold text-2xl text-foreground mb-1">{topThree[0]?.name}</h3>
                <div className="text-4xl font-bold text-badge-gold mb-1">{topThree[0]?.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">@username</div>
              </motion.div>

              {/* Third Place - Right */}
              <motion.div initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5
              }} className="flex flex-col items-center mt-8">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-badge-bronze bg-badge-bronze/20 p-1">
                    <img src={topThree[2]?.avatarUrl} alt={topThree[2]?.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-badge-bronze rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-1">{topThree[2]?.name}</h3>
                <div className="text-3xl font-bold text-badge-bronze mb-1">{topThree[2]?.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">@username</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Current User Position */}
        {currentUser && <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="mb-8">
            <Card variant="default" className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 flex justify-center">
                  <span className="text-primary font-bold">#{currentUser.rank}</span>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-soft">
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
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
          </motion.section>}

        {/* Full Leaderboard */}
        <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }}>
          <Card variant="default" className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Full Rankings</h2>
            </div>
            
            <div className="divide-y divide-border">
              {sortedLeaderboard.map((user, index) => <motion.div key={user.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.1 * index
              }} className={`p-4 hover:bg-muted/50 transition-colors ${user.rank <= 3 ? 'bg-primary/5' : ''} ${user.id === currentUser?.id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}>
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="w-12 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border shadow-soft">
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          {user.classId === currentUser?.classId && <Tooltip>
                              <TooltipTrigger>
                                <img src={graduationCapIcon} alt="Classmate" className="w-4 h-4" style={{filter: 'hue-rotate(120deg) saturate(2)'}} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This student is in your class.</p>
                              </TooltipContent>
                            </Tooltip>}
                          {user.instituteId === currentUser?.instituteId && user.classId !== currentUser?.classId && <Tooltip>
                              <TooltipTrigger>
                                <img src={instituteIcon} alt="School mate" className="w-4 h-4" style={{filter: 'hue-rotate(200deg) saturate(1.5)'}} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This student is from your school.</p>
                              </TooltipContent>
                            </Tooltip>}
                        </div>
                        <LevelPill level={user.level} size="sm" />
                        {user.badgeCount > 0 && <Badge variant="outline" className="text-xs">
                            {user.badgeCount} badges
                          </Badge>}
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
                </motion.div>)}
            </div>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.9
        }} className="mt-12 text-center">
          <Card variant="default" className="p-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Climb the Leaderboard!</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Complete more challenges, learn new lessons, and engage with the community to boost your ranking!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/challenges">Take Challenges</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white" asChild>
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
    </TooltipProvider>;
};
export default Leaderboard;