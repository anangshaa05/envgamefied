import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Users, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NGODashboard = () => {
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
            <p className="text-muted-foreground">Manage challenges and monitor institute progress</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="font-semibold text-foreground">{ngoProfile.name}</p>
          </div>
        </div>

        {/* Challenges Management Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">Challenges Management</h2>
            <Button onClick={handleCreateChallenge} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Challenge
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
        </section>

        {/* Institute Submissions Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Institute Submissions</h2>
          
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">{submission.instituteName}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Challenge: {submission.challengeTitle}
                      </p>
                      <p className="text-sm mb-2">{submission.proofDescription}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Submitted: {submission.submissionDate}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {submission.points} points
                        </span>
                      </div>
                    </div>
                    
                    {submission.status === "Pending Review" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproveSubmission(submission.id)}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectSubmission(submission.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Profile Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Profile</h2>
          
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                NGO Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Organization Name</p>
                <p className="font-medium">{ngoProfile.name}</p>
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
        </section>
      </div>
    </div>
  );
};

export default NGODashboard;