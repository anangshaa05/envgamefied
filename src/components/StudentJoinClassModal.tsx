import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface StudentJoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentJoinClassModal({ isOpen, onClose }: StudentJoinClassModalProps) {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [classCode, setClassCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setClassCode('');
    onClose();
  };

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      toast({
        title: "Class code required",
        description: "Please enter a class code to join",
        variant: "destructive"
      });
      return;
    }

    if (classCode.length < 5 || classCode.length > 8) {
      toast({
        title: "Invalid class code",
        description: "Class code should be 5-8 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate joining class - in real app this would be a Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the joined section (using class code as section name for demo)
      localStorage.setItem('joinedSection', `Section ${classCode.toUpperCase()}`);
      
      toast({
        title: "Successfully joined class! 🎉",
        description: `Welcome to Section ${classCode.toUpperCase()}`,
      });
      
      handleClose();
      // Refresh the page to show updated section info
      window.location.reload();
    } catch (error) {
      toast({
        title: "Failed to join class",
        description: "Please check your class code and try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await signOut();
      handleClose();
      toast({
        title: "Signed out",
        description: "You can now sign in with a different account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Join class</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info Section */}
          {user && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">You're currently signed in as</p>
              
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={userProfile?.avatar_url || "/placeholder.svg"} 
                    alt={userProfile?.display_name || user.email || "User"} 
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {userProfile?.display_name ? 
                      userProfile.display_name.charAt(0).toUpperCase() : 
                      user.email ? user.email.charAt(0).toUpperCase() : "U"
                    }
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate text-base">
                    {userProfile?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student'}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleSwitchAccount}
                className="w-fit px-6"
              >
                Switch account
              </Button>
            </div>
          )}

          {/* Class Code Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="classCode" className="text-base font-medium">
                Class code
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Ask your teacher for the class code, then enter it here.
              </p>
            </div>
            
            <Input
              id="classCode"
              placeholder="Class code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="text-base"
              maxLength={8}
            />
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <p className="font-medium text-foreground">To sign in with a class code</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Use an authorized account</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Use a class code with 5-8 letters or numbers, and no spaces or symbols</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleJoinClass} 
              disabled={isLoading || !classCode.trim()}
              className="min-w-[80px]"
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}