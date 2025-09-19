import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Globe, Users, Calendar, Target, Award } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description: string;
  category: 'environment' | 'education' | 'health' | 'technology' | 'community';
  target_audience: 'primary' | 'secondary' | 'college' | 'all';
  duration_weeks: number;
  max_participants: number;
  current_participants: number;
  status: 'draft' | 'active' | 'completed' | 'paused';
  created_at: string;
  start_date: string;
  end_date: string;
  reward_points: number;
}

interface ProgramManagerProps {
  ngoId: string;
}

export default function ProgramManager({ ngoId }: ProgramManagerProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Program['category']>('environment');
  const [targetAudience, setTargetAudience] = useState<Program['target_audience']>('all');
  const [duration, setDuration] = useState('4');
  const [maxParticipants, setMaxParticipants] = useState('100');
  const [rewardPoints, setRewardPoints] = useState('50');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    // Mock data for now
    const mockPrograms: Program[] = [
      {
        id: '1',
        title: 'Green Schools Initiative',
        description: 'A comprehensive program to help schools become more environmentally sustainable through waste reduction, energy conservation, and green practices.',
        category: 'environment',
        target_audience: 'secondary',
        duration_weeks: 8,
        max_participants: 50,
        current_participants: 32,
        status: 'active',
        created_at: '2025-08-15T10:00:00Z',
        start_date: '2025-09-01',
        end_date: '2025-10-27',
        reward_points: 100,
      },
      {
        id: '2',
        title: 'Digital Literacy for All',
        description: 'Teaching basic computer skills and digital literacy to underserved communities and schools.',
        category: 'technology',
        target_audience: 'all',
        duration_weeks: 6,
        max_participants: 200,
        current_participants: 145,
        status: 'active',
        created_at: '2025-08-20T14:30:00Z',
        start_date: '2025-09-15',
        end_date: '2025-10-27',
        reward_points: 75,
      },
    ];
    
    setPrograms(mockPrograms);
  }, [ngoId]);

  const createProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (parseInt(duration) * 7));

    const newProgram: Program = {
      id: Date.now().toString(),
      title,
      description,
      category,
      target_audience: targetAudience,
      duration_weeks: parseInt(duration),
      max_participants: parseInt(maxParticipants),
      current_participants: 0,
      status: 'draft',
      created_at: new Date().toISOString(),
      start_date: startDate,
      end_date: endDate.toISOString().split('T')[0],
      reward_points: parseInt(rewardPoints),
    };

    setPrograms(prev => [newProgram, ...prev]);
    
    toast({
      title: "Success",
      description: "Program created successfully!",
    });
    
    setIsCreateModalOpen(false);
    resetForm();
    setCreating(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('environment');
    setTargetAudience('all');
    setDuration('4');
    setMaxParticipants('100');
    setRewardPoints('50');
    setStartDate('');
  };

  const getCategoryIcon = (category: Program['category']) => {
    switch (category) {
      case 'environment': return '🌱';
      case 'education': return '📚';
      case 'health': return '🏥';
      case 'technology': return '💻';
      case 'community': return '🤝';
    }
  };

  const getStatusColor = (status: Program['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getAudienceLabel = (audience: Program['target_audience']) => {
    switch (audience) {
      case 'primary': return 'Primary School';
      case 'secondary': return 'Secondary School';
      case 'college': return 'College';
      case 'all': return 'All Ages';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">NGO Programs</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Program</DialogTitle>
              <DialogDescription>
                Design an educational program for schools and students.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createProgram} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Green Schools Initiative"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your program goals and activities..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(value: Program['category']) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environment">🌱 Environment</SelectItem>
                      <SelectItem value="education">📚 Education</SelectItem>
                      <SelectItem value="health">🏥 Health</SelectItem>
                      <SelectItem value="technology">💻 Technology</SelectItem>
                      <SelectItem value="community">🤝 Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={(value: Program['target_audience']) => setTargetAudience(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary School</SelectItem>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="all">All Ages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Weeks)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    max="52"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rewardPoints">Reward Points</Label>
                  <Input
                    id="rewardPoints"
                    type="number"
                    value={rewardPoints}
                    onChange={(e) => setRewardPoints(e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? 'Creating...' : 'Create Program'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {programs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No programs yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first educational program to engage schools and students.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getCategoryIcon(program.category)}</span>
                    <div>
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                      <CardDescription className="mt-1">{program.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{program.current_participants}/{program.max_participants}</p>
                      <p className="text-xs text-muted-foreground">Participants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{program.duration_weeks} weeks</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{getAudienceLabel(program.target_audience)}</p>
                      <p className="text-xs text-muted-foreground">Target</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{program.reward_points} pts</p>
                      <p className="text-xs text-muted-foreground">Reward</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {new Date(program.start_date).toLocaleDateString()} - {new Date(program.end_date).toLocaleDateString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                    {program.status === 'draft' && (
                      <Button size="sm">
                        Publish
                      </Button>
                    )}
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