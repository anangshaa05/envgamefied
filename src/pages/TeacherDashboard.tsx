import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Trophy, Target, GraduationCap } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for classes
  const [classes] = useState([
    {
      id: 1,
      name: "Environmental Science 101",
      students: 28,
      totalPoints: 2450,
      challengesCompleted: 15,
      avgGrade: "B+"
    },
    {
      id: 2,
      name: "Climate Change Studies",
      students: 22,
      totalPoints: 1890,
      challengesCompleted: 12,
      avgGrade: "A-"
    },
    {
      id: 3,
      name: "Sustainability Workshop",
      students: 35,
      totalPoints: 3200,
      challengesCompleted: 18,
      avgGrade: "B"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes and track student progress</p>
        </div>

        {/* Classes Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">My Classes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Class Card - Prominent */}
            <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer group">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Class</h3>
                <p className="text-sm text-muted-foreground">Start teaching a new group of students</p>
              </CardContent>
            </Card>

            {/* Existing Classes */}
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">{classItem.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {classItem.students} Students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-primary">{classItem.totalPoints}</div>
                      <div className="text-xs text-muted-foreground">Total Points</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-secondary">{classItem.challengesCompleted}</div>
                      <div className="text-xs text-muted-foreground">Challenges</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Grade</span>
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {classItem.avgGrade}
                    </Badge>
                  </div>
                  
                  <Button className="w-full">
                    View & Manage Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Assessment & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                Across all classes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Points
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,513</div>
              <p className="text-xs text-muted-foreground">
                Per student this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Challenges Assigned
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                This academic year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              <span>Assign Grades</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Target className="w-6 h-6" />
              <span>Create Challenge</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Trophy className="w-6 h-6" />
              <span>View Leaderboard</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span>Student Analytics</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;