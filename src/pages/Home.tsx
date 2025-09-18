import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TreePine, Droplets, Recycle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import StatsCounter from "@/components/StatsCounter";
import ProgressBar from "@/components/ProgressBar";
import { user, challenges, campaigns } from "@/data/mockData";

const Home = () => {
  const completedChallenges = challenges.filter(c => c.submitted).length;
  const activeChallenges = challenges.filter(c => !c.submitted).length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 px-4 min-h-screen">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn. Play. Act
              <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                for the Planet.
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of eco-warriors in gamified environmental learning. 
              Complete challenges, earn badges, and make a real impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-hover"
                asChild
              >
                <Link to="/profile" className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-primary/20 hover:border-primary/40 hover:text-emerald-300 font-semibold px-8 py-6 text-lg rounded-xl transition-colors"
              >
                Join as Teacher/NGO
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">50K+</div>
              <div className="text-muted-foreground">Active Learners</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">1M+</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">500+</div>
              <div className="text-muted-foreground">Challenges Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">100+</div>
              <div className="text-muted-foreground">Partner NGOs</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose EcoLearn Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose EcoLearn?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines education, gamification, and real-world impact to 
              create the most engaging environmental learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📚</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Engage with gamified lessons on environmental topics
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🏆</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Real Challenges</h3>
              <p className="text-muted-foreground">
                Complete real-world environmental challenges
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Community Impact</h3>
              <p className="text-muted-foreground">
                Join a global community making a difference
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🎯</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your environmental impact and achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Make a Difference CTA */}
      <section className="bg-success py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of environmental champions and start your journey 
            toward a sustainable future.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-success hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-hover"
            asChild
          >
            <Link to="/profile">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Your Impact Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCounter
              value={user.ecoPoints}
              label="Eco Points Earned"
              icon="🏆"
              duration={2}
            />
            <StatsCounter
              value={user.totalTreesPlanted}
              label="Trees Planted"
              icon="🌳"
              duration={2.2}
            />
            <StatsCounter
              value={user.wasteReduced}
              label="Waste Reduced"
              icon="♻️"
              suffix=" kg"
              decimals={1}
              duration={2.4}
            />
            <StatsCounter
              value={user.waterSaved}
              label="Water Saved"
              icon="💧"
              suffix=" L"
              duration={2.6}
            />
          </div>
        </motion.section>

        {/* Active Challenges & Progress */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="default" className="p-6 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-level rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-soft">
                    {user.level}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Level {user.level}</h3>
                    <p className="text-sm text-muted-foreground">Eco Explorer</p>
                  </div>
                </div>
                <ProgressBar
                  progress={(user.pointsToNextLevel / 300) * 100}
                  variant="eco"
                  label="Progress to next level"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {user.pointsToNextLevel} points until Level {user.level + 1}
                </p>
              </Card>
            </motion.div>

            {/* Active Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card variant="challenge" className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Active Challenges</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/challenges">View All</Link>
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">In Progress</span>
                    <span className="font-bold text-warning">{activeChallenges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Completed</span>
                    <span className="font-bold text-success">{completedChallenges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Success Rate</span>
                    <span className="font-bold text-primary">
                      {Math.round((completedChallenges / challenges.length) * 100)}%
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Top Contributor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="community" className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Weekly Leader</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/leaderboard">Leaderboard</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-badge-gold shadow-soft">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maya"
                      alt="Maya Earth"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Maya Earth</p>
                    <p className="text-sm text-muted-foreground">3,850 points</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Featured Campaigns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Active Campaigns</h2>
            <Button variant="outline" asChild>
              <Link to="/community">View All Campaigns</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={campaign.id} variant="default" className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{campaign.title}</h3>
                    <p className="text-sm opacity-90">{campaign.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {campaign.progress.toLocaleString()} / {campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <ProgressBar
                      progress={(campaign.progress / campaign.goal) * 100}
                      variant="success"
                      showPercentage={false}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {campaign.participants.toLocaleString()} participants
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      Ends {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Quick Action Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                title: "Start Learning", 
                desc: "Explore eco lessons", 
                icon: "📚", 
                link: "/learning",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                title: "Take Challenge", 
                desc: "Complete eco tasks", 
                icon: "🎯", 
                link: "/challenges",
                color: "from-green-500 to-emerald-500" 
              },
              { 
                title: "Join Community", 
                desc: "Connect with others", 
                icon: "👥", 
                link: "/community",
                color: "from-purple-500 to-pink-500"
              },
                { 
                  title: "View Profile", 
                  desc: "See achievements", 
                  icon: "🏅", 
                  link: "/profile",
                  color: "from-orange-500 to-red-500"
                }
            ].map((action, index) => (
              <Card 
                key={action.title}
                variant="default"
                className="group cursor-pointer overflow-hidden"
                onClick={() => {}}
              >
                <Link to={action.link} className="block p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-3xl shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </Link>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;