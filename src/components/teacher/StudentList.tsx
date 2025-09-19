import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, Trophy, BookOpen, Calendar } from 'lucide-react';

interface Student {
  id: string;
  display_name: string;
  email: string;
  enrolled_at: string;
  progress_score?: number;
  completed_tasks?: number;
  total_tasks?: number;
}

interface StudentListProps {
  classId: string;
  className: string;
}

export default function StudentList({ classId, className }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('class_enrollments')
      .select(`
        student_id,
        enrolled_at,
        profiles!inner(
          id,
          display_name
        )
      `)
      .eq('class_id', classId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } else {
      const formattedStudents = data?.map(enrollment => ({
        id: enrollment.student_id,
        display_name: enrollment.profiles.display_name || 'Student',
        email: '', // Will need to get from auth if needed
        enrolled_at: enrollment.enrolled_at,
        progress_score: Math.floor(Math.random() * 100), // Mock data
        completed_tasks: Math.floor(Math.random() * 10),
        total_tasks: 10,
      })) || [];
      
      setStudents(formattedStudents);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading students...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Students in {className}</h2>
        <Badge variant="secondary">{students.length} students</Badge>
      </div>

      {students.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students enrolled yet</h3>
            <p className="text-muted-foreground">
              Share your class code with students to get them enrolled.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg`} />
                      <AvatarFallback>
                        {student.display_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{student.display_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Enrolled {new Date(student.enrolled_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{student.progress_score}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">
                          {student.completed_tasks}/{student.total_tasks}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}