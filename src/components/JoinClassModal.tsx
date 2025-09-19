import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { validateClassCode } from "@/utils/classCodeValidator";

interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinClass: (classCode: string) => void;
}

const JoinClassModal = ({ isOpen, onClose, onJoinClass }: JoinClassModalProps) => {
  const [classCode, setClassCode] = useState("");
  const { toast } = useToast();
  const { setSectionInfo, setIsSignedIn, sectionName } = useUser();

  const handleJoin = () => {
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

    const validationResult = validateClassCode(classCode);
    
    if (!validationResult.isValid) {
      toast({
        title: "Invalid class code",
        description: "Please check your class code and try again",
        variant: "destructive"
      });
      return;
    }

    // Store section info and sign in user
    setSectionInfo(validationResult.sectionName!, classCode);
    setIsSignedIn(true);
    
    onJoinClass(classCode);
    setClassCode("");
    onClose();
    
    toast({
      title: "Successfully joined class! 🎉",
      description: `Welcome to ${validationResult.sectionName}`,
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
                <AvatarFallback className="bg-primary text-primary-foreground">K</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">5134_Kanika</p>
                <p className="text-sm text-muted-foreground">2305134@kiit.ac.in</p>
                {sectionName && (
                  <p className="text-xs text-primary font-medium mt-1">{sectionName}</p>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="mt-3" 
              size="sm"
              onClick={() => {
                toast({
                  title: "Switch Account",
                  description: "Account switching functionality coming soon!",
                });
              }}
            >
              Switch account
            </Button>
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