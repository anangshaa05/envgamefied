import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'teacher' | 'ngo';
type NGOType = 'education' | 'welfare' | 'stem_outreach' | 'environmental' | 'community_development' | 'other';

export default function Auth() {
  const navigate = useNavigate();
  const { user, signUp, signIn } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // Teacher specific
  const [institution, setInstitution] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  
  // NGO specific
  const [organizationName, setOrganizationName] = useState('');
  const [ngoType, setNgoType] = useState<NGOType>('education');
  const [officialEmail, setOfficialEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const createProfile = async (userId: string, role: UserRole) => {
    // Create base profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        role,
        display_name: displayName,
      });

    if (profileError) throw profileError;

    // Create role-specific profile
    if (role === 'teacher') {
      const { error: teacherError } = await supabase
        .from('teacher_profiles')
        .insert({
          id: userId,
          institution,
          school_email: schoolEmail,
        });
      if (teacherError) throw teacherError;
    } else if (role === 'ngo') {
      const { error: ngoError } = await supabase
        .from('ngo_profiles')
        .insert({
          id: userId,
          organization_name: organizationName,
          ngo_type: ngoType,
          official_email: officialEmail,
          website_url: websiteUrl,
        });
      if (ngoError) throw ngoError;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message === 'Invalid login credentials') {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please check your credentials.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
        }
      } else {
        if (!selectedRole) {
          toast({
            title: "Role Required",
            description: "Please select whether you're a teacher or represent an NGO.",
            variant: "destructive",
          });
          return;
        }

        const { error } = await signUp(email, password, {
          display_name: displayName,
          role: selectedRole,
        });
        
        if (error) {
          if (error.message === 'User already registered') {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please try logging in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Signup Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          // Get the user ID from the auth response
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await createProfile(user.id, selectedRole);
          }
          
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLogin && !selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join EcoWise</CardTitle>
            <CardDescription>Choose your role to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setSelectedRole('teacher')}
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
              onClick={() => setSelectedRole('ngo')}
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
                onClick={() => setIsLogin(true)}
                className="text-sm"
              >
                Already have an account? Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Welcome Back' : `${selectedRole === 'teacher' ? 'Teacher' : 'NGO'} Registration`}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName">Full Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && selectedRole === 'teacher' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution (School/College)</Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">School Email (Optional)</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    placeholder="For verification purposes"
                  />
                </div>
              </>
            )}

            {!isLogin && selectedRole === 'ngo' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ngoType">Type of NGO</Label>
                  <Select value={ngoType} onValueChange={(value: NGOType) => setNgoType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="welfare">Welfare</SelectItem>
                      <SelectItem value="stem_outreach">STEM Outreach</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="community_development">Community Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officialEmail">Official Email</Label>
                  <Input
                    id="officialEmail"
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://your-organization.org"
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setSelectedRole(null);
                }}
                className="text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}