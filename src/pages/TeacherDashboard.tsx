import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, Trophy, Target, CheckCircle, XCircle } from "lucide-react";
import TeacherNavbar from "@/components/TeacherNavbar";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("class-management");
  const [selectedClass, setSelectedClass] = useState("");
  
  // Mock data for classes
  const classes = [
    {
      id: "1",
      name: "Environmental Science 101",
      students: 28,
    },
    {
      id: "2", 
      name: "Climate Change Studies",
      students: 22,
    },
    {
      id: "3",
      name: "Sustainability Workshop", 
      students: 35,
    }
  ];

  // Mock student data
  const students = [
    { id: 1, name: "Alice Johnson", points: 1250, position: 1, challengesCompleted: 8, grade: "A" },
    { id: 2, name: "Bob Smith", points: 1100, position: 2, challengesCompleted: 7, grade: "B+" },
    { id: 3, name: "Carol Davis", points: 950, position: 3, challengesCompleted: 6, grade: "B" },
  ];

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
          <Card key={classItem.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{classItem.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {classItem.students} Students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Class</Button>
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
                    <Button size="sm">Assign Grade</Button>
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