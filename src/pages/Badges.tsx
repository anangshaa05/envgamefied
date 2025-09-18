import { motion } from "framer-motion";
import { Lock, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Card from "@/components/Card";
import { badges } from "@/data/mockData";

const Badges = () => {
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  const rarityColors = {
    common: "border-slate-300 bg-slate-50",
    uncommon: "border-emerald-300 bg-emerald-50",
    rare: "border-blue-300 bg-blue-50", 
    legendary: "border-purple-300 bg-purple-50"
  };

  const rarityGradients = {
    common: "from-slate-400 to-slate-500",
    uncommon: "from-emerald-400 to-emerald-600",
    rare: "from-blue-400 to-blue-600",
    legendary: "from-purple-400 to-purple-600"
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
            <Award className="w-8 h-8 text-badge-gold" />
            <h1 className="text-3xl font-bold text-foreground">Badge Collection</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock badges by completing challenges, learning lessons, and contributing to the community. 
            Show off your environmental expertise! 🏆
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="default" className="p-6 text-center bg-gradient-to-br from-badge-gold/20 to-badge-gold/10">
              <div className="text-3xl font-bold text-badge-gold mb-2">
                {unlockedBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </Card>
            <Card variant="default" className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {badges.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Available</div>
            </Card>
            <Card variant="default" className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">
                {Math.round((unlockedBadges.length / badges.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Collection Rate</div>
            </Card>
            <Card variant="default" className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                {badges.filter(b => b.rarity === 'legendary' && b.unlocked).length}
              </div>
              <div className="text-sm text-muted-foreground">Legendary Badges</div>
            </Card>
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="default" className="px-4 py-2 cursor-pointer">
              All Badges
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Unlocked ({unlockedBadges.length})
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Locked ({lockedBadges.length})
            </Badge>
            <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Legendary
            </Badge>
          </div>
        </motion.section>

        {/* Unlocked Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Unlocked Badges</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {unlockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card 
                      variant="default" 
                      className={`p-4 cursor-pointer group ${rarityColors[badge.rarity]} hover:shadow-hover border-2`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${rarityGradients[badge.rarity]} flex items-center justify-center text-2xl text-white shadow-soft group-hover:scale-110 transition-transform`}>
                          {badge.icon}
                        </div>
                        <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                          {badge.name}
                        </h3>
                        <Badge variant="outline" className={`text-xs capitalize ${badge.rarity === 'legendary' ? 'border-purple-500 text-purple-700' : ''}`}>
                          {badge.rarity}
                        </Badge>
                        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(badge.unlockedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${rarityGradients[badge.rarity]} flex items-center justify-center text-3xl text-white shadow-soft`}>
                          {badge.icon}
                        </div>
                        {badge.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                      <Badge variant="outline" className={`capitalize ${badge.rarity === 'legendary' ? 'border-purple-500 text-purple-700' : ''}`}>
                        {badge.rarity}
                      </Badge>
                      <p className="text-muted-foreground">{badge.description}</p>
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center justify-center space-x-2 text-success">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Unlocked on {new Date(badge.unlockedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Locked Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Locked Badges</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card 
                      variant="default" 
                      className="p-4 cursor-pointer group opacity-75 hover:opacity-100 transition-opacity border-2 border-dashed border-muted"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl relative group-hover:scale-105 transition-transform">
                          <Lock className="w-6 h-6 text-muted-foreground absolute" />
                          <div className="opacity-30 text-xl">{badge.icon}</div>
                        </div>
                        <h3 className="font-bold text-sm text-muted-foreground mb-1">
                          {badge.name}
                        </h3>
                        <Badge variant="outline" className="text-xs capitalize border-muted text-muted-foreground">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-3xl relative">
                          <Lock className="w-8 h-8 text-muted-foreground absolute z-10" />
                          <div className="opacity-30 text-3xl">{badge.icon}</div>
                        </div>
                        {badge.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                      <Badge variant="outline" className="capitalize border-muted text-muted-foreground">
                        {badge.rarity}
                      </Badge>
                      <p className="text-muted-foreground">{badge.description}</p>
                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <div className="flex items-center justify-center space-x-2 text-warning">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm font-medium">Complete the requirements to unlock</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        View Requirements
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card variant="default" className="p-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Complete Your Collection!</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Unlock all badges by completing challenges, learning new lessons, and contributing to the community. 
              Show off your environmental expertise!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Take Challenges
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Continue Learning
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Badges;