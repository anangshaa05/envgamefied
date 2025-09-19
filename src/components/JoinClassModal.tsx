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

  const handleClose = () => {
    onClose();
  };

  const handleRoleSelection = (role: 'teacher' | 'ngo') => {
    handleClose();
    if (user) {
      // User is logged in, redirect to appropriate dashboard
      navigate(role === 'teacher' ? '/teacher-dashboard' : '/ngo-dashboard');
    } else {
      // User not logged in, redirect to auth page for signup
      navigate('/auth');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Join as Teacher/NGO</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
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
            className="w-full h-16 text-left flex items-center gap-3 hover:bg-success/5 hover:border-success"
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
            className="w-full h-16 text-left flex items-center gap-3 hover:bg-success/5 hover:border-success"
          >
            <span className="text-2xl">🌍</span>
            <div>
              <div className="font-semibold">I represent an NGO</div>
              <div className="text-sm text-muted-foreground">Create programs and sponsor contests</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}