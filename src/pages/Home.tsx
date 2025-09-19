import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TreePine, Droplets, Recycle, Users, Sparkles, Instagram, Facebook, Youtube, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import StatsCounter from "@/components/StatsCounter";
import ProgressBar from "@/components/ProgressBar";
import JoinClassModal from "@/components/JoinClassModal";
import { user, challenges, campaigns } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import ecolearnLogo from "@/assets/ecolearn-logo.png";
import xLogo from "@/assets/x-logo.png";

const Home = () => {
  const { toast } = useToast();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const completedChallenges = challenges.filter(c => c.submitted).length;
  const activeChallenges = challenges.filter(c => !c.submitted).length;

  const handleGetStarted = () => {
    toast({
      title: "Welcome to EcoWise! 🌱",
      description: "Your environmental journey starts now!",
    });
  };

  const handleJoinAsTeacher = () => {
    setShowJoinModal(true);
  };

  const handleStartJourney = () => {
    toast({
      title: "Journey Started! 🚀",
      description: "Ready to make a difference? Let's go!",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 h-3/4">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-2 relative">
              <img 
                src={ecolearnLogo} 
                alt="EcoLearn" 
                className="w-48 md:w-56 mx-auto mb-4 opacity-90" 
              />
            </div>
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
                <Link to="/profile" className="flex items-center space-x-2" onClick={handleGetStarted}>
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-primary/20 hover:border-primary/40 hover:text-emerald-300 font-semibold px-8 py-6 text-lg rounded-xl transition-colors"
                onClick={handleJoinAsTeacher}
              >
                Join as Teacher/NGO
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Stats Section */}
      <section className="bg-white py-8">
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
              Why Choose EcoWise?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines education, gamification, and real-world impact to 
              create the most engaging environmental learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Link to="/learning" className="group">
              <Card className="text-center h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📚</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-success">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Engage with gamified lessons on environmental topics
                </p>
              </Card>
            </Link>
            
            <Link to="/challenges" className="group">
              <Card className="text-center h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🏆</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-success">Real Challenges</h3>
                <p className="text-muted-foreground">
                  Complete real-world environmental challenges
                </p>
              </Card>
            </Link>
            
            <Link to="/community" className="group">
              <Card className="text-center h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">👥</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-success">Community Impact</h3>
                <p className="text-muted-foreground">
                  Join a global community making a difference
                </p>
              </Card>
            </Link>
            
            <Link to="/profile" className="group">
              <Card className="text-center h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🎯</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-success">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your environmental impact and achievements
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Make a Difference CTA */}
      <section className="py-12" style={{ backgroundColor: 'hsl(120 80% 35%)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Join our community of environmental champions and start your journey 
            toward a sustainable future.
          </p>
          <Button 
            size="lg" 
            className="bg-white hover:bg-white/90 font-semibold px-6 py-4 text-lg rounded-xl shadow-hover"
            style={{ color: 'hsl(120 80% 35%)' }}
            onClick={handleStartJourney}
            asChild
          >
            <Link to="/profile">Start Your Journey</Link>
          </Button>
          
          {/* Copyright and Social Media */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-6">
                <Instagram className="w-6 h-6 text-white hover:text-white/80 cursor-pointer transition-colors" />
                <Facebook className="w-6 h-6 text-white hover:text-white/80 cursor-pointer transition-colors" />
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 108 98" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 cursor-pointer transition-all hover:opacity-80"
                >
                  <path d="M85.05 0H101.613L65.4326 41.4566L108 97.8789H74.6743L48.5537 63.666L18.6994 97.8789H2.12143L40.8163 53.5217L0 0.00771419H34.1743L57.7491 31.2737L85.05 0ZM79.2257 87.9429H88.4057L29.16 9.41914H19.3166L79.2257 87.9429Z" fill="white"/>
                </svg>
                <Youtube className="w-6 h-6 text-white hover:text-white/80 cursor-pointer transition-colors" />
              </div>
              <p className="text-sm text-white/80">
                © All rights reserved to EcoWise
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <JoinClassModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)}
      />
    </div>
  );
};

export default Home;