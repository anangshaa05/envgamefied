import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Target, Trophy, Users, BarChart3, Award, Menu, X, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/data/mockData";
import logo from "@/assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
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
            {/* Eco Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-level rounded-full px-3 py-1 text-white text-sm font-medium shadow-soft">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
                {user.level}
              </div>
              <span>{user.ecoPoints.toLocaleString()}</span>
              <span className="text-xs opacity-80">pts</span>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Level {user.level} • {user.ecoPoints} points</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
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
            
            {/* Mobile Points Display */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between px-3 py-2 bg-gradient-level rounded-lg text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.level}
                  </div>
                  <span className="font-medium">Level {user.level}</span>
                </div>
                <span className="font-bold">{user.ecoPoints.toLocaleString()} pts</span>
              </div>
            </div>
          </motion.div>}
      </div>
    </motion.nav>;
};
export default Navbar;