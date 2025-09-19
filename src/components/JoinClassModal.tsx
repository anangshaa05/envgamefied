import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinClassModal({ isOpen, onClose }: JoinClassModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleJoinAsStudent = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement student class joining logic
    console.log('Joining class as student:', { classCode, name, email });
    onClose();
  };

  const handleRoleSelection = (role: 'teacher' | 'ngo') => {
    onClose();
    if (user) {
      // User is logged in, redirect to appropriate dashboard
      navigate(role === 'teacher' ? '/teacher-dashboard' : '/ngo-dashboard');
    } else {
      // User not logged in, redirect to auth with role pre-selected
      navigate('/auth');
    }
  };

  const handleJoinAsTeacherOrNGO = () => {
    setShowRoleSelection(true);
  };

  if (showRoleSelection) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Join as Teacher/NGO</DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Choose your role to get started with EcoWise
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelection('teacher')}
              variant="outline"
              className="w-full h-16 text-left flex items-center gap-3"
            >
              <span className="text-2xl">👩‍🏫</span>
              <div>
                <div className="font-semibold">I'm a Teacher</div>
                <div className="text-sm text-muted-foreground">Create classes and manage students</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleRoleSelection('ngo')}
              variant="outline"  
              className="w-full h-16 text-left flex items-center gap-3"
            >
              <span className="text-2xl">🌍</span>
              <div>
                <div className="font-semibold">I represent an NGO</div>
                <div className="text-sm text-muted-foreground">Create programs and sponsor contests</div>
              </div>
            </Button>

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowRoleSelection(false)}
                className="text-sm"
              >
                Back to student signup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Join EcoWise</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Join as a student or educator to get started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Join as Student</h3>
            <form onSubmit={handleJoinAsStudent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classCode">Class Code</Label>
                <Input
                  id="classCode"
                  placeholder="Enter 6-digit class code"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  maxLength={6}
                  className="uppercase"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Join Class</Button>
            </form>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={handleJoinAsTeacherOrNGO}
              className="w-full"
            >
              Join as Teacher/NGO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}