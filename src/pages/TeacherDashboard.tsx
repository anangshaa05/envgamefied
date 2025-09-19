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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">My Classes</h2>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Class
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {classItem.students} Students
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Points</span>
                    <Badge variant="secondary">{classItem.totalPoints}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Challenges</span>
                    <Badge variant="outline">{classItem.challengesCompleted}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Grade</span>
                    <Badge variant="default">{classItem.avgGrade}</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Class Details
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