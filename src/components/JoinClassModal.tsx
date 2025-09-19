import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinClass: (classCode: string, sectionName: string) => void;
}

// Mock class codes with their corresponding sections
const validClassCodes = {
  "ENV101": "Environmental Science - Section A",
  "ECO201": "Ecology and Conservation - Section B", 
  "SUS301": "Sustainability Studies - Section C",
  "BIO150": "Environmental Biology - Section D",
  "CHM250": "Green Chemistry - Section E"
};

const JoinClassModal = ({ isOpen, onClose, onJoinClass }: JoinClassModalProps) => {
  const [classCode, setClassCode] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "5134_Kanika",
    email: "2305134@kiit.ac.in",
    initial: "K"
  });
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const { toast } = useToast();

  const mockAccounts = [
    { name: "5134_Kanika", email: "2305134@kiit.ac.in", initial: "K" },
    { name: "5678_Arjun", email: "2305678@kiit.ac.in", initial: "A" },
    { name: "9012_Priya", email: "2309012@kiit.ac.in", initial: "P" }
  ];

  const handleJoin = () => {
    if (!classCode.trim()) {
      toast({
        title: "Class code required",
        description: "Please enter a class code to join",
        variant: "destructive"
      });
      return;
    }

    const upperClassCode = classCode.toUpperCase();
    const sectionName = validClassCodes[upperClassCode as keyof typeof validClassCodes];

    if (!sectionName) {
      toast({
        title: "Invalid class code",
        description: "Please check the class code and try again.",
        variant: "destructive"
      });
      return;
    }

    onJoinClass(upperClassCode, sectionName);
    setClassCode("");
    onClose();
    toast({
      title: "Successfully joined class! 🎉",
      description: `Welcome to ${sectionName}`,
    });
  };

  const handleSwitchAccount = (account: typeof currentUser) => {
    setCurrentUser(account);
    setShowAccountSwitcher(false);
    toast({
      title: "Account switched",
      description: `Switched to ${account.name}`,
    });
  };

  const handleCancel = () => {
    setClassCode("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Join class</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current user section */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-3">You're currently signed in as</p>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">{currentUser.initial}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="mt-3" 
              size="sm"
              onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
            >
              Switch account
            </Button>

            {/* Account Switcher */}
            {showAccountSwitcher && (
              <div className="mt-3 p-3 bg-background border rounded-lg">
                <p className="text-sm font-medium mb-2">Select account:</p>
                <div className="space-y-2">
                  {mockAccounts.map((account) => (
                    <div
                      key={account.email}
                      onClick={() => handleSwitchAccount(account)}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        currentUser.email === account.email 
                          ? "bg-primary/10 border border-primary/20" 
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-muted text-xs">{account.initial}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{account.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{account.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Class code section */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="classCode" className="text-base font-medium">Class code</Label>
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
            />
          </div>

          {/* Instructions */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">To sign in with a class code</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use an authorized account</li>
              <li>• Use a class code with 5-8 letters or numbers, and no spaces or symbols</li>
            </ul>
            <div className="mt-3 p-2 bg-info/10 rounded border border-info/20">
              <p className="text-xs text-muted-foreground font-medium mb-1">Demo class codes:</p>
              <p className="text-xs text-muted-foreground">ENV101, ECO201, SUS301, BIO150, CHM250</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              If you have trouble joining the class, go to the{" "}
              <Button variant="link" className="p-0 h-auto text-primary underline text-sm">
                Help Center article
              </Button>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleJoin}>
              Join
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinClassModal;