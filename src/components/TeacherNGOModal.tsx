import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TeacherNGOModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TeacherNGOModal = ({ open, onOpenChange }: TeacherNGOModalProps) => {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    onOpenChange(false);
    navigate("/auth?type=teacher");
  };

  const handleNGOClick = () => {
    onOpenChange(false);
    navigate("/auth?type=ngo");
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