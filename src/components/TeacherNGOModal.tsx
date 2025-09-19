import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TeacherNGOModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TeacherNGOModal = ({ open, onOpenChange }: TeacherNGOModalProps) => {
  const { toast } = useToast();

  const handleTeacherClick = () => {
    toast({
      title: "Teacher Registration 👩‍🏫",
      description: "Thank you for your interest! We'll be in touch soon.",
    });
    onOpenChange(false);
  };

  const handleNGOClick = () => {
    toast({
      title: "NGO Partnership 🌍",
      description: "Thank you for your interest! We'll be in touch soon.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Join Our Mission
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground mb-6">
            Choose how you'd like to contribute to environmental education:
          </p>
          
          <Button
            onClick={handleTeacherClick}
            className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">👩‍🏫</span>
            I'm a Teacher
          </Button>
          
          <Button
            onClick={handleNGOClick}
            variant="outline"
            className="w-full h-16 text-lg font-semibold border-2 hover:bg-secondary/10 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🌍</span>
            I represent an NGO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherNGOModal;