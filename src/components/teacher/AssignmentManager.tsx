import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, BookOpen, Calendar, Clock, Users } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'homework' | 'quiz' | 'project' | 'reading';
  due_date: string;
  points: number;
  status: 'draft' | 'published' | 'closed';
  submissions_count?: number;
}

interface AssignmentManagerProps {
  classId: string;
  className: string;
}

export default function AssignmentManager({ classId, className }: AssignmentManagerProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Assignment['type']>('homework');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('100');

  useEffect(() => {
    // Mock data for now - would connect to real assignments table
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Climate Change Research Project',
        description: 'Research and present on the impacts of climate change in your local area.',
        type: 'project',
        due_date: '2025-10-15',
        points: 100,
        status: 'published',
        submissions_count: 12,
      },
      {
        id: '2',
        title: 'Renewable Energy Quiz',
        description: 'Quiz covering solar, wind, and hydroelectric energy.',
        type: 'quiz',
        due_date: '2025-10-08',
        points: 50,
        status: 'published',
        submissions_count: 8,
      },
    ];
    
    setAssignments(mockAssignments);
    setLoading(false);
  }, [classId]);

  const createAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    // Mock creation - would actually save to database
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title,
      description,
      type,
      due_date: dueDate,
      points: parseInt(points),
      status: 'published',
      submissions_count: 0,
    };

    setAssignments(prev => [newAssignment, ...prev]);
    
    toast({
      title: "Success",
      description: "Assignment created successfully!",
    });
    
    setIsCreateModalOpen(false);
    resetForm();
    setCreating(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('homework');
    setDueDate('');
    setPoints('100');
  };

  const getTypeIcon = (type: Assignment['type']) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'project': return '🎯';
      case 'reading': return '📚';
      default: return '📋';
    }
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Assignments for {className}</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createAssignment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Solar Energy Research"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value: Assignment['type']) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homework">📋 Homework</SelectItem>
                    <SelectItem value="quiz">📝 Quiz</SelectItem>
                    <SelectItem value="project">🎯 Project</SelectItem>
                    <SelectItem value="reading">📚 Reading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Assignment instructions..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? 'Creating...' : 'Create Assignment'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {assignments.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assignments yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first assignment to engage your students.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getTypeIcon(assignment.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{assignment.submissions_count} submissions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold">{assignment.points} points</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Submissions
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
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