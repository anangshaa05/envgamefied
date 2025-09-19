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
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

type UserRole = 'teacher' | 'ngo';
type NGOType = 'education' | 'welfare' | 'stem_outreach' | 'environmental' | 'community_development' | 'other';

const institutions = [
  'Kalinga Institute of Industrial Technology (KIIT)',
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Mumbai',
  'Delhi University',
  'Jawaharlal Nehru University (JNU)',
  'Other'
];

export default function Auth() {
  const navigate = useNavigate();
  const { user, signInWithMagicLink } = useAuth();
  const { toast } = useToast();
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // Teacher specific
  const [institution, setInstitution] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [customInstitution, setCustomInstitution] = useState('');
  
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

  const createRoleSpecificProfile = async (userId: string, role: UserRole) => {
    try {
      if (role === 'teacher') {
        const finalInstitution = institution === 'Other' ? customInstitution : institution;
        const { error: teacherError } = await supabase
          .from('teacher_profiles')
          .insert({
            id: userId,
            institution: finalInstitution,
            school_email: collegeEmail,
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
    } catch (error) {
      console.error('Error creating role-specific profile:', error);
    }
  };

  const handleMagicLinkAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select whether you're a teacher or represent an NGO.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signInWithMagicLink(email, selectedRole);
      
      if (error) {
        if (error.message?.includes('Email not confirmed')) {
          toast({
            title: "Email Configuration Issue",
            description: "Email sending is not properly configured. Please contact support or check your Supabase email settings.",
            variant: "destructive",
          });
        } else if (error.message?.includes('rate limit')) {
          toast({
            title: "Too Many Requests",
            description: "Please wait a moment before requesting another sign-in link.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Authentication Failed",
            description: error.message || "Failed to send sign-in link. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        setEmailSent(true);
        toast({
          title: "Sign-in Link Sent! 📧",
          description: `Check your email at ${email} for the sign-in link.`,
        });

        // Store additional profile data for when user completes auth
        localStorage.setItem('pendingProfileData', JSON.stringify({
          role: selectedRole,
          displayName,
          institution: selectedRole === 'teacher' ? (institution === 'Other' ? customInstitution : institution) : undefined,
          collegeEmail: selectedRole === 'teacher' ? collegeEmail : undefined,
          organizationName: selectedRole === 'ngo' ? organizationName : undefined,
          ngoType: selectedRole === 'ngo' ? ngoType : undefined,
          officialEmail: selectedRole === 'ngo' ? officialEmail : undefined,
          websiteUrl: selectedRole === 'ngo' ? websiteUrl : undefined,
        }));
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

  // Handle completion of profile creation after auth
  useEffect(() => {
    const handleAuthCompletion = async () => {
      if (user) {
        const pendingData = localStorage.getItem('pendingProfileData');
        if (pendingData) {
          try {
            const profileData = JSON.parse(pendingData);
            await createRoleSpecificProfile(user.id, profileData.role);
            localStorage.removeItem('pendingProfileData');
          } catch (error) {
            console.error('Error completing profile:', error);
          }
        }
      }
    };

    handleAuthCompletion();
  }, [user]);

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a sign-in link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Click the link in your email to sign in</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>The link will redirect you back to this app</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>You'll be automatically taken to your dashboard</span>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or:
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setEmailSent(false);
                  setLoading(false);
                }}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign in to EcoWise</CardTitle>
            <CardDescription>Choose your role to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setSelectedRole('teacher')}
              variant="outline"
              className="w-full h-16 text-left flex items-center gap-3"
            >
              <span className="text-2xl">👩‍🏫</span>
              <div>
                <div className="font-semibold">Sign in as Teacher</div>
                <div className="text-sm text-muted-foreground">Manage classes and students</div>
              </div>
            </Button>
            
            <Button
              onClick={() => setSelectedRole('ngo')}
              variant="outline"
              className="w-full h-16 text-left flex items-center gap-3"
            >
              <span className="text-2xl">🌍</span>
              <div>
                <div className="font-semibold">Sign in as NGO</div>
                <div className="text-sm text-muted-foreground">Create programs and contests</div>
              </div>
            </Button>
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
            {selectedRole === 'teacher' ? 'Teacher Sign-in' : 'NGO Sign-in'}
          </CardTitle>
          <CardDescription>
            Enter your details to receive a sign-in link via email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLinkAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            {selectedRole === 'teacher' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution (School/College)</Label>
                  <Select value={institution} onValueChange={setInstitution} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map((inst) => (
                        <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {institution === 'Other' && (
                  <div className="space-y-2">
                    <Label htmlFor="customInstitution">Enter Institution Name</Label>
                    <Input
                      id="customInstitution"
                      value={customInstitution}
                      onChange={(e) => setCustomInstitution(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="collegeEmail">College Email ID</Label>
                  <Input
                    id="collegeEmail"
                    type="email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    placeholder="Enter your official college email"
                    required
                  />
                </div>
              </>
            )}

            {selectedRole === 'ngo' && (
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

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <strong>Passwordless sign-in:</strong> We'll send a secure link to your email. 
                  Click the link to sign in - no password needed!
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Sending sign-in link...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send sign-in link
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setSelectedRole(null)}
                className="text-sm"
              >
                ← Choose different role
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}