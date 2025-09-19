import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Building, CheckCircle, Clock } from 'lucide-react';

interface TeacherProfile {
  display_name: string;
  institution: string;
  school_email: string;
  verification_status: string;
}

export default function TeacherProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // Fetch both profiles and teacher_profiles
      const [profileResult, teacherResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('teacher_profiles').select('*').eq('id', user.id).single()
      ]);

      if (profileResult.error || teacherResult.error) {
        throw new Error('Failed to fetch profile');
      }

      setProfile({
        display_name: profileResult.data.display_name || '',
        institution: teacherResult.data.institution || '',
        school_email: teacherResult.data.school_email || '',
        verification_status: teacherResult.data.verification_status || 'pending'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending Verification
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Not Verified
          </Badge>
        );
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teacher Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and verification status</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </div>
              {profile && getVerificationBadge(profile.verification_status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg">{profile?.display_name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{user?.email || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Institution Details
            </CardTitle>
            <CardDescription>Your teaching institution information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Institution</label>
                <p className="text-lg">{profile?.institution || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">College Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{profile?.school_email || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {profile?.verification_status === 'pending' && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Verification Pending</CardTitle>
              <CardDescription className="text-orange-700">
                Your teacher verification is currently under review. Once verified, you'll have access to all teacher features.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your teaching activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Classes Created</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Assignments</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Announcements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}