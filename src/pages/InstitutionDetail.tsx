import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, CheckCircle, XCircle, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstitutionDetail = () => {
  const { institutionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app, this would be fetched based on institutionId
  const [institution] = useState({
    id: institutionId,
    name: "Green Valley School",
    type: "School",
    location: "California, USA",
    totalStudents: 450,
    activeSubmissions: 3
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "Alice Johnson",
      challengeTitle: "Plastic Reduction Challenge",
      submissionDate: "2024-03-01",
      status: "Pending Review",
      proofDescription: "Implemented reusable containers in cafeteria and reduced plastic waste by 60%. Added before/after photos and waste measurement data.",
      points: 150,
      attachments: ["before.jpg", "after.jpg", "waste_data.xlsx"]
    },
    {
      id: 2,
      studentName: "Bob Smith",
      challengeTitle: "Energy Conservation Week",
      submissionDate: "2024-02-28",
      status: "Pending Review",
      proofDescription: "LED lighting installation in dormitory completed. Reduced energy consumption by 40%.",
      points: 200,
      attachments: ["energy_report.pdf", "installation_photos.zip"]
    },
    {
      id: 3,
      studentName: "Carol Davis",
      challengeTitle: "Community Garden Project",
      submissionDate: "2024-03-02",
      status: "Approved",
      proofDescription: "Successfully established organic garden with 15 vegetable varieties",
      points: 180,
      attachments: ["garden_photos.jpg", "harvest_log.pdf"]
    }
  ]);

  const handleApproveSubmission = (submissionId: number) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, status: "Approved" }
          : sub
      )
    );
    
    toast({
      title: "Submission Approved",
      description: "Points have been awarded to the student",
    });
  };

  const handleRejectSubmission = (submissionId: number) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, status: "Rejected" }
          : sub
      )
    );

    toast({
      title: "Submission Rejected",
      description: "Feedback has been sent to the student",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const pendingCount = submissions.filter(sub => sub.status === "Pending Review").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/ngo-dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">{institution.name}</h1>
                <p className="text-sm text-muted-foreground">{institution.type} • {institution.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Institution Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{institution.totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{submissions.length}</p>
                  <p className="text-sm text-muted-foreground">Total Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Student Submissions</h2>
            <p className="text-muted-foreground">Review and manage submissions from {institution.name}</p>
          </div>
          
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {submission.challengeTitle}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Submission Details</h4>
                    <p className="text-sm text-muted-foreground">{submission.proofDescription}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Submitted: {submission.submissionDate}</span>
                    <span>Points: {submission.points}</span>
                    <span>Attachments: {submission.attachments.length}</span>
                  </div>

                  {submission.attachments.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Attachments</h5>
                      <div className="flex flex-wrap gap-2">
                        {submission.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {submission.status === "Pending Review" && (
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveSubmission(submission.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectSubmission(submission.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetail;