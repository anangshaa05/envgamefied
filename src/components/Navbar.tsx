import { useState } from "react";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Target, Trophy, Users, BarChart3, Award, Menu, X, User, Settings, LogOut, LogIn, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/ecowise-logo-new.png";
import JoinClassModal from "./JoinClassModal";
import StudentJoinClassModal from "./StudentJoinClassModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showStudentJoinModal, setShowStudentJoinModal] = useState(false);
  const [joinedSection, setJoinedSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  // Load joined section from localStorage
  React.useEffect(() => {
    const savedSection = localStorage.getItem('joinedSection');
    if (savedSection) {
      setJoinedSection(savedSection);
    }

    // Listen for storage changes to update section in real-time
    const handleStorageChange = () => {
      const updatedSection = localStorage.getItem('joinedSection');
      setJoinedSection(updatedSection);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const navigation = [{
    name: "Home",
    href: "/",
    icon: Home
  }, {
    name: "Learning Hub",
    href: "/learning",
    icon: BookOpen
  }, {
    name: "Challenges",
    href: "/challenges",
    icon: Target
  }, {
    name: "Leaderboard",  
    href: "/leaderboard",
    icon: Trophy
  }, {
    name: "Community",
    href: "/community",
    icon: Users
  }, {
    name: "Profile",
    href: "/profile",
    icon: User
  }];
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const handleAuthAction = () => {
    if (user) {
      handleSignOut();
    } else {
      setShowJoinModal(true);
    }
  };
  return <motion.nav initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="EcoWise Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.href} className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive(item.href) && <motion.div layoutId="navbar-indicator" className="absolute inset-0 bg-primary/10 rounded-lg border-2 border-primary/20" transition={{
                type: "spring",
                stiffness: 350,
                damping: 30
              }} />}
                </Link>;
          })}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt={user?.email || "User"} />
                    <AvatarFallback>
                      {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">
                    {user?.email || "Guest User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user ? "Welcome back!" : "Please sign in"}
                  </p>
                  {joinedSection && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-xs font-medium text-primary">📚 {joinedSection}</span>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Settings panel coming soon!" })}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem onClick={() => setShowStudentJoinModal(true)}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Join class
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {!user ? (
                  <DropdownMenuItem onClick={() => setShowJoinModal(true)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="md:hidden py-3 border-t border-border">
            <div className="space-y-1">
              {navigation.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>;
          })}
            </div>
          </motion.div>}
      </div>
      
        <JoinClassModal 
          isOpen={showJoinModal} 
          onClose={() => setShowJoinModal(false)}
        />
        <StudentJoinClassModal 
          isOpen={showStudentJoinModal} 
          onClose={() => setShowStudentJoinModal(false)}
        />
    </motion.nav>;
};
export default Navbar;