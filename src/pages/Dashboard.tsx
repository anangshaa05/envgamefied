import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, TrendingUp, Target, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import StatsCounter from "@/components/StatsCounter";
import ProgressBar from "@/components/ProgressBar";
import LevelPill from "@/components/LevelPill";
import { user, dailyChallenges, recentActivity, challenges, lessons } from "@/data/mockData";

const Dashboard = () => {
  const completedLessons = lessons.filter(l => l.completed).length;
  const completedChallenges = challenges.filter(c => c.submitted).length;
  const completedDaily = dailyChallenges.filter(dc => dc.completed).length;

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

            {/* Daily Challenges */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.5 }}
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
              transition={{ delay: 0.6 }}
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
              transition={{ delay: 0.7 }}
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

export default Dashboard;