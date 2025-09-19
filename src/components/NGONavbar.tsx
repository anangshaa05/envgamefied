import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NGONavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ngoName: string;
}

const NGONavbar = ({ activeTab, onTabChange, ngoName }: NGONavbarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your NGO account.",
    });
    navigate("/");
  };

  const tabs = [
    { id: "challenges", label: "Challenges Management" },
    { id: "submissions", label: "Institution Submissions" },
    { id: "profile", label: "Profile" }
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-foreground">{ngoName}</h1>
            </div>
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className="text-sm"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
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

export default NGONavbar;