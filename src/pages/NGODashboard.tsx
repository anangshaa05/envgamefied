import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NGONavbar from "@/components/NGONavbar";

const NGODashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("challenges");

  // Mock data for challenges
  const [challenges] = useState([
    {
      id: 1,
      title: "Plastic Reduction Challenge",
      description: "Reduce plastic waste in school cafeterias by 50%",
      status: "Active",
      participatingInstitutes: 12,
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Energy Conservation Week",
      description: "Implement energy-saving practices across campus",
      status: "Completed",
      participatingInstitutes: 8,
      createdDate: "2024-02-01"
    },
    {
      id: 3,
      title: "Community Garden Project",
      description: "Establish sustainable gardens in educational institutions",
      status: "Active",
      participatingInstitutes: 15,
      createdDate: "2024-02-20"
    }
  ]);

  // Mock data for institute submissions
  const [submissions] = useState([
    {
      id: 1,
      instituteName: "Green Valley School",
      challengeTitle: "Plastic Reduction Challenge",
      submissionDate: "2024-03-01",
      status: "Pending Review",
      proofDescription: "Implemented reusable containers in cafeteria",
      points: 150
    },
    {
      id: 2,
      instituteName: "Eco Tech University",
      challengeTitle: "Energy Conservation Week", 
      submissionDate: "2024-02-28",
      status: "Approved",
      proofDescription: "LED lighting installation completed",
      points: 200
    },
    {
      id: 3,
      instituteName: "Sustainability High",
      challengeTitle: "Community Garden Project",
      submissionDate: "2024-03-02",
      status: "Rejected",
      proofDescription: "Garden setup incomplete",
      points: 0
    }
  ]);

  // NGO profile data
  const ngoProfile = {
    name: "EcoChange Foundation",
    email: "contact@ecochange.org",
    website: "www.ecochange.org"
  };

  const handleCreateChallenge = () => {
    toast({
      title: "Create Challenge",
      description: "Challenge creation form would open here",
    });
  };

  const handleApproveSubmission = (submissionId: number) => {
    toast({
      title: "Submission Approved",
      description: "Points have been awarded to the institute",
    });
  };

  const handleRejectSubmission = (submissionId: number) => {
    toast({
      title: "Submission Rejected",
      description: "Feedback has been sent to the institute",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "Completed":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "Approved":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "Pending Review":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const renderChallengesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Challenges Management</h2>
          <p className="text-muted-foreground">Create and manage your sustainability challenges</p>
        </div>
        <Button onClick={handleCreateChallenge} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Challenge
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <Badge className={getStatusColor(challenge.status)}>
                  {challenge.status}
                </Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{challenge.participatingInstitutes} institutes participating</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Created: {challenge.createdDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Group submissions by institution
  const institutionSubmissions = submissions.reduce((acc, submission) => {
    if (!acc[submission.instituteName]) {
      acc[submission.instituteName] = [];
    }
    acc[submission.instituteName].push(submission);
    return acc;
  }, {} as Record<string, typeof submissions>);

  const handleInstitutionClick = (institutionName: string) => {
    // In a real app, you'd use the institution ID
    const institutionId = institutionName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/institution/${institutionId}`);
  };

  const renderSubmissionsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Institution Submissions</h2>
        <p className="text-muted-foreground">Review submissions organized by participating institutions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(institutionSubmissions).map(([institutionName, institutionSubs]) => {
          const pendingCount = institutionSubs.filter(sub => sub.status === "Pending Review").length;
          const approvedCount = institutionSubs.filter(sub => sub.status === "Approved").length;
          const totalPoints = institutionSubs.reduce((sum, sub) => sub.status === "Approved" ? sum + sub.points : sum, 0);
          
          return (
            <Card 
              key={institutionName} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-l-4 border-l-primary/20 hover:border-l-primary"
              onClick={() => handleInstitutionClick(institutionName)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {institutionName}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {institutionSubs.length} total submission{institutionSubs.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </div>
                  {pendingCount > 0 && (
                    <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-200 animate-pulse">
                      <Clock className="w-3 h-3 mr-1" />
                      {pendingCount}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                    <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                    <p className="text-xs text-green-600/80">Approved</p>
                  </div>
                  <div className="text-center p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                    <p className="text-2xl font-bold text-blue-600">{totalPoints}</p>
                    <p className="text-xs text-blue-600/80">Points Earned</p>
                  </div>
                </div>
                
                {pendingCount > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700">
                      {pendingCount} submission{pendingCount !== 1 ? 's' : ''} pending review
                    </span>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInstitutionClick(institutionName);
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">NGO Profile</h2>
        <p className="text-muted-foreground">Your organization information</p>
      </div>
      
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Organization Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Organization Name</p>
            <p className="font-medium text-lg">{ngoProfile.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{ngoProfile.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Website</p>
            <p className="font-medium text-primary">{ngoProfile.website}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <NGONavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        ngoName={ngoProfile.name}
      />
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "challenges" && renderChallengesTab()}
        {activeTab === "submissions" && renderSubmissionsTab()}
        {activeTab === "profile" && renderProfileTab()}
      </div>
    </div>
  );
};

export default NGODashboard;