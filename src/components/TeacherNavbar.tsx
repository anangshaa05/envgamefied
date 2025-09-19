import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, User, LogOut } from "lucide-react";

interface TeacherNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TeacherNavbar = ({ activeTab, onTabChange }: TeacherNavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const tabs = [
    { id: "class-management", label: "Class Management", icon: BookOpen },
    { id: "student-assessment", label: "Student Assessment", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-foreground">Teacher Dashboard</h1>
            
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="flex items-center gap-2"
                    onClick={() => onTabChange(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;