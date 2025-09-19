import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, Trophy, Target, CheckCircle, XCircle } from "lucide-react";
import TeacherNavbar from "@/components/TeacherNavbar";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("class-management");
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", points: 1250, position: 1, challengesCompleted: 8, grade: "A" },
    { id: 2, name: "Bob Smith", points: 1100, position: 2, challengesCompleted: 7, grade: "B+" },
    { id: 3, name: "Carol Davis", points: 950, position: 3, challengesCompleted: 6, grade: "B" },
  ]);
  const { toast } = useToast();
  
  // Mock data for classes
  const classes = [
    {
      id: "1",
      name: "Environmental Science 101",
      students: 28,
      totalPoints: 15650,
    },
    {
      id: "2", 
      name: "Climate Change Studies",
      students: 22,
      totalPoints: 12420,
    },
    {
      id: "3",
      name: "Sustainability Workshop", 
      students: 35,
      totalPoints: 18950,
    }
  ];

  const handleAssignGrade = (studentId: number, newGrade: string, comments: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, grade: newGrade }
          : student
      )
    );
    
    toast({
      title: "Grade Assigned Successfully",
      description: `Grade ${newGrade} has been assigned to the student.`,
    });
  };

  const AssignGradeDialog = ({ student }: { student: typeof students[0] }) => {
    const [selectedGrade, setSelectedGrade] = useState(student.grade);
    const [comments, setComments] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

    const handleSubmit = () => {
      handleAssignGrade(student.id, selectedGrade, comments);
      setIsOpen(false);
      setComments("");
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Assign Grade</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Grade to {student.name}</DialogTitle>
            <DialogDescription>
              Select a grade and add optional comments for this student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Add feedback or comments..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Assign Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const renderClassManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Class Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New Class
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card/50 to-card/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {classItem.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                {classItem.students} Students
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Points</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                  {classItem.totalPoints.toLocaleString()}
                </span>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
                Manage Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudentAssessment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Student Assessment</h2>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.id}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedClass && (
        <div className="grid gap-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {student.points} points
                      </span>
                      <span>Position: #{student.position}</span>
                      <span>Challenges: {student.challengesCompleted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{student.grade}</Badge>
                    <AssignGradeDialog student={student} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Teacher Profile</h2>
      
      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-lg">Prof. Sarah Williams</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Institute</label>
              <p className="text-lg">GreenTech University</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg">sarah.williams@greentech.edu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "class-management":
        return renderClassManagement();
      case "student-assessment":
        return renderStudentAssessment();
      case "profile":
        return renderProfile();
      default:
        return renderClassManagement();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;