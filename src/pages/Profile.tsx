import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, TrendingUp, Target, Award, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Card from "@/components/Card";
import StatsCounter from "@/components/StatsCounter";
import ProgressBar from "@/components/ProgressBar";
import LevelPill from "@/components/LevelPill";
import { user, dailyChallenges, recentActivity, challenges, lessons, badges } from "@/data/mockData";

const Profile = () => {
  const completedLessons = lessons.filter(l => l.completed).length;
  const completedChallenges = challenges.filter(c => c.submitted).length;
  const completedDaily = dailyChallenges.filter(dc => dc.completed).length;
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  const rarityColors = {
    common: "border-slate-300 bg-slate-50",
    uncommon: "border-emerald-300 bg-emerald-50", 
    rare: "border-blue-300 bg-blue-50",
    legendary: "border-purple-300 bg-purple-50"
  };

  const rarityGradients = {
    common: "from-slate-500 to-slate-600",
    uncommon: "from-emerald-500 to-emerald-600",
    rare: "from-blue-500 to-purple-600", 
    legendary: "from-amber-400 to-orange-500"
  };

  const badgeIconColors = {
    common: "text-slate-700",
    uncommon: "text-emerald-700",
    rare: "text-blue-700",
    legendary: "text-amber-800"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to make an impact today? Let's continue your eco journey.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <LevelPill level={user.level} size="lg" />
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{user.ecoPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="default" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Level Progress</h2>
                  <LevelPill level={user.level} />
                </div>
                <div className="mb-4">
                  <ProgressBar
                    progress={((300 - user.pointsToNextLevel) / 300) * 100}
                    variant="eco"
                    label={`Level ${user.level} → Level ${user.level + 1}`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-primary">{user.ecoPoints}</p>
                    <p className="text-xs text-muted-foreground">Current Points</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-warning">{user.pointsToNextLevel}</p>
                    <p className="text-xs text-muted-foreground">Points Needed</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-success">{user.level + 1}</p>
                    <p className="text-xs text-muted-foreground">Next Level</p>
                  </div>
                </div>
              </Card>
            </motion.section>

            {/* Impact Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Environmental Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCounter
                  value={user.totalTreesPlanted}
                  label="Trees Planted"
                  icon="🌳"
                />
                <StatsCounter
                  value={user.wasteReduced}
                  label="Waste Reduced"
                  icon="♻️"
                  suffix=" kg"
                  decimals={1}
                />
                <StatsCounter
                  value={user.waterSaved}
                  label="Water Saved"
                  icon="💧"
                  suffix=" L"
                />
              </div>
            </motion.section>

            {/* Badges Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-badge-gold" />
                  <h2 className="text-xl font-semibold text-foreground">Your Badges</h2>
                </div>
                <Button variant="ghost" size="sm">
                  View All Collection
                </Button>
              </div>
              
              {/* Badge Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <Card variant="default" className="p-4 text-center bg-gradient-to-br from-badge-gold/20 to-badge-gold/10">
                  <div className="text-2xl font-bold text-badge-gold mb-1">
                    {unlockedBadges.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Earned</div>
                </Card>
                <Card variant="default" className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {badges.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </Card>
                <Card variant="default" className="p-4 text-center">
                  <div className="text-2xl font-bold text-success mb-1">
                    {Math.round((unlockedBadges.length / badges.length) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </Card>
                <Card variant="default" className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning mb-1">
                    {badges.filter(b => b.rarity === 'legendary' && b.unlocked).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Legendary</div>
                </Card>
              </div>
              
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-4">
                {unlockedBadges.slice(0, 8).map((badge, index) => (
                  <Dialog key={badge.id}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer group relative">
                        <div className="text-center">
                          {/* Hexagonal Badge */}
                          <div className={`relative w-14 h-14 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                            {/* Hexagon Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${rarityGradients[badge.rarity]} rounded-lg shadow-lg`} 
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            {/* Inner Hexagon for icon background */}
                            <div className="absolute inset-1.5 bg-white/95 rounded-lg shadow-inner"
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            {/* Badge Icon */}
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                              <span className={badgeIconColors[badge.rarity]}>
                                {badge.icon}
                              </span>
                            </div>
                            {/* Enhanced Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent rounded-lg opacity-80"
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            {/* Additional shine streak */}
                            <div className="absolute top-1 left-3 w-6 h-1 bg-white/40 rounded-full transform -rotate-45"></div>
                            {/* Sparkle decorations */}
                            {badge.rarity === 'legendary' && (
                              <>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-glow"></div>
                                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse delay-300"></div>
                                <div className="absolute top-0 -left-1 w-1 h-1 bg-orange-300 rounded-full animate-pulse delay-500"></div>
                              </>
                            )}
                            {badge.rarity === 'rare' && (
                              <>
                                <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700"></div>
                              </>
                            )}
                            {badge.rarity === 'uncommon' && (
                              <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-emerald-300 rounded-full animate-pulse delay-200"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          {/* Larger Hexagon for Dialog */}
                          <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className={`absolute inset-0 bg-gradient-to-br ${rarityGradients[badge.rarity]} rounded-xl shadow-xl`} 
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            <div className="absolute inset-2 bg-white/95 rounded-xl shadow-inner"
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
                              <span className={badgeIconColors[badge.rarity]}>
                                {badge.icon}
                              </span>
                            </div>
                            {/* Enhanced Shine Effect for Dialog */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent rounded-xl opacity-80"
                                 style={{
                                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                 }}>
                            </div>
                            {/* Multiple shine streaks */}
                            <div className="absolute top-2 left-4 w-8 h-1.5 bg-white/50 rounded-full transform -rotate-45"></div>
                            <div className="absolute top-4 left-6 w-6 h-1 bg-white/30 rounded-full transform -rotate-45"></div>
                            {/* Enhanced sparkles for dialog */}
                            {badge.rarity === 'legendary' && (
                              <>
                                <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-glow"></div>
                                <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-amber-300 rounded-full animate-pulse delay-300"></div>
                                <div className="absolute top-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                                <div className="absolute -top-1 left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-500"></div>
                                <div className="absolute bottom-2 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse delay-700"></div>
                              </>
                            )}
                            {badge.rarity === 'rare' && (
                              <>
                                <div className="absolute -top-2 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
                                <div className="absolute top-1 -left-1 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse delay-200"></div>
                              </>
                            )}
                            {badge.rarity === 'uncommon' && (
                              <>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse delay-300"></div>
                              </>
                            )}
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
                ))}
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {unlockedBadges.length} of {badges.length} badges unlocked ({Math.round((unlockedBadges.length / badges.length) * 100)}%)
                </p>
              </div>
            </motion.section>

            {/* Daily Challenges */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Today's Challenges</h2>
                <span className="text-sm text-muted-foreground">
                  {completedDaily} of {dailyChallenges.length} completed
                </span>
              </div>
              <div className="space-y-3">
                {dailyChallenges.map((challenge, index) => (
                  <Card 
                    key={challenge.id}
                    variant="challenge"
                    className={`p-4 ${challenge.completed ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        challenge.completed 
                          ? 'bg-success text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {challenge.completed ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          challenge.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}>
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-primary">+{challenge.points}</span>
                        {!challenge.completed && (
                          <Button size="sm" variant="outline">
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card variant="default" className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/challenges">
                      <Target className="w-4 h-4 mr-2" />
                      New Challenge
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/learning">
                      <Clock className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/community">
                      <Users className="w-4 h-4 mr-2" />
                      Join Discussion
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.section>

            {/* Learning Progress */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="lesson" className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Learning Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Lessons Completed</span>
                    <span className="font-bold text-primary">{completedLessons}/{lessons.length}</span>
                  </div>
                  <ProgressBar
                    progress={(completedLessons / lessons.length) * 100}
                    variant="default"
                    showPercentage={false}
                  />
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/learning">Continue Learning</Link>
                  </Button>
                </div>
              </Card>
            </motion.section>

            {/* Challenge Stats */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card variant="challenge" className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Challenge Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Completed</span>
                    <span className="font-bold text-success">{completedChallenges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">In Progress</span>
                    <span className="font-bold text-warning">{challenges.length - completedChallenges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Success Rate</span>
                    <span className="font-bold text-primary">
                      {Math.round((completedChallenges / challenges.length) * 100)}%
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/challenges">View Challenges</Link>
                  </Button>
                </div>
              </Card>
            </motion.section>

            {/* Recent Activity */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card variant="community" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Recent Activity</h3>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        activity.type === 'badge_earned' ? 'bg-badge-gold text-white' :
                        activity.type === 'challenge_completed' ? 'bg-success text-white' :
                        activity.type === 'lesson_finished' ? 'bg-primary text-white' :
                        'bg-secondary text-secondary-foreground'
                      }`}>
                        {activity.type === 'badge_earned' ? '🏅' :
                         activity.type === 'challenge_completed' ? '✓' :
                         activity.type === 'lesson_finished' ? '📚' : '🆙'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()}
                          {activity.points > 0 && ` • +${activity.points} pts`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;