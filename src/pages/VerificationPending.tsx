import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function VerificationPending() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  
  const role = searchParams.get('role') as 'teacher' | 'ngo' | null;
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (user) {
      // User is verified, redirect to appropriate dashboard
      if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (role === 'ngo') {
        navigate('/ngo-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, role, navigate]);

  const handleResendVerification = async () => {
    setIsResending(true);
    // In a real implementation, you'd call the resend verification email API
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "Verification email sent",
        description: "Please check your email inbox and spam folder.",
      });
    }, 2000);
  };

  const roleConfig = {
    teacher: {
      title: 'Teacher Verification',
      description: 'We\'ve sent a verification email to your college email address.',
      icon: '👩‍🏫',
      dashboardPath: '/teacher-dashboard'
    },
    ngo: {
      title: 'NGO Verification',
      description: 'We\'ve sent a verification email to your organization\'s official email address.',
      icon: '🌍',
      dashboardPath: '/ngo-dashboard'
    }
  };

  const config = role && roleConfig[role] ? roleConfig[role] : {
    title: 'Email Verification',
    description: 'We\'ve sent a verification email to your email address.',
    icon: '📧',
    dashboardPath: '/'
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{config.title}</CardTitle>
          <CardDescription className="text-center">
            {config.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Verification email sent to:
              </span>
            </div>
            <div className="font-semibold text-primary">{email}</div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-2xl">{config.icon}</span>
              What's next?
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Check your email inbox (and spam folder)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Click the verification link in the email</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You'll be automatically redirected to your dashboard</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResendVerification}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate('/auth')}
            >
              Back to Sign In
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Having trouble? Check your spam folder or contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}