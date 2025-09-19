import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Globe, Users, Award, TrendingUp, Building, Mail, ExternalLink, Target, Trophy } from 'lucide-react';
import ProgramManager from '@/components/ngo/ProgramManager';
import ContestManager from '@/components/ngo/ContestManager';

interface NGOProfile {
  organization_name: string;
  ngo_type: string;
  official_email: string;
  website_url: string;
  verification_status: string;
}

export default function NGODashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ngoProfile, setNgoProfile] = useState<NGOProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchNGOProfile();
    }
  }, [user]);

  const fetchNGOProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ngo_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch NGO profile",
        variant: "destructive",
      });
    } else {
      setNgoProfile(data);
    }
    
    setLoadingProfile(false);
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Verification</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Verification Rejected</Badge>;
      default:
        return <Badge variant="secondary">Not Verified</Badge>;
    }
  };

  const getNGOTypeLabel = (type: string) => {
    const types = {
      'education': 'Education',
      'welfare': 'Welfare',
      'stem_outreach': 'STEM Outreach',
      'environmental': 'Environmental',
      'community_development': 'Community Development',
      'other': 'Other'
    };
    return types[type as keyof typeof types] || type;
  };

  if (loading || loadingProfile) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">NGO Dashboard</h1>
              <p className="text-muted-foreground">
                {ngoProfile ? `Welcome, ${ngoProfile.organization_name}` : 'Manage your programs and track impact'}
              </p>
            </div>
            {ngoProfile && getVerificationBadge(ngoProfile.verification_status)}
          </div>
        </div>

        {ngoProfile && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Organization Name</p>
                <p className="font-semibold">{ngoProfile.organization_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-semibold">{getNGOTypeLabel(ngoProfile.ngo_type)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Official Email</p>
                  <p className="font-semibold">{ngoProfile.official_email}</p>
                </div>
              </div>
              {ngoProfile.website_url && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a 
                      href={ngoProfile.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {ngoProfile.website_url}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schools Reached</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsored Contests</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Programs
            </TabsTrigger>
            <TabsTrigger value="contests" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Contests
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Get started with your NGO initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    Create New Program
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Trophy className="mr-2 h-4 w-4" />
                    Sponsor Contest
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Connect with Schools
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest programs and contests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No recent activity. Create your first program to get started!
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="programs">
            <ProgramManager ngoId={user?.id || ''} />
          </TabsContent>
          
          <TabsContent value="contests">
            <ContestManager ngoId={user?.id || ''} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Analytics</CardTitle>
                  <CardDescription>
                    Measure your organization's impact and reach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">0</div>
                      <p className="text-sm text-muted-foreground">Schools Reached</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">0</div>
                      <p className="text-sm text-muted-foreground">Students Impacted</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">0</div>
                      <p className="text-sm text-muted-foreground">Programs Completed</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      Analytics will be available once you start creating programs and contests.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {ngoProfile?.verification_status === 'pending' && (
          <Card className="mt-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Verification Pending</CardTitle>
              <CardDescription className="text-orange-700">
                Your NGO verification is currently under review. You'll receive an email once the verification is complete.
                Verified NGOs get access to additional features like program creation and contest sponsorship.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}