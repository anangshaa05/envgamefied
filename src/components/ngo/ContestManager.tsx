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
import { Plus, Trophy, Calendar, DollarSign, Users, Target, Clock } from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  description: string;
  category: 'science' | 'environment' | 'innovation' | 'social_impact' | 'art' | 'technology';
  level: 'school' | 'district' | 'state' | 'national' | 'international';
  prize_pool: number;
  registration_fee: number;
  max_teams: number;
  team_size: number;
  current_registrations: number;
  status: 'upcoming' | 'registration_open' | 'in_progress' | 'judging' | 'completed';
  registration_deadline: string;
  submission_deadline: string;
  results_date: string;
  created_at: string;
}

interface ContestManagerProps {
  ngoId: string;
}

export default function ContestManager({ ngoId }: ContestManagerProps) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Contest['category']>('science');
  const [level, setLevel] = useState<Contest['level']>('school');
  const [prizePool, setPrizePool] = useState('1000');
  const [registrationFee, setRegistrationFee] = useState('0');
  const [maxTeams, setMaxTeams] = useState('50');
  const [teamSize, setTeamSize] = useState('3');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  const [resultsDate, setResultsDate] = useState('');

  useEffect(() => {
    // Mock data for now
    const mockContests: Contest[] = [
      {
        id: '1',
        title: 'Green Innovation Challenge 2025',
        description: 'Design innovative solutions to combat climate change and promote sustainability in your community.',
        category: 'environment',
        level: 'national',
        prize_pool: 10000,
        registration_fee: 25,
        max_teams: 100,
        team_size: 4,
        current_registrations: 67,
        status: 'registration_open',
        registration_deadline: '2025-10-15',
        submission_deadline: '2025-11-30',
        results_date: '2025-12-15',
        created_at: '2025-08-01T10:00:00Z',
      },
      {
        id: '2',
        title: 'STEM Olympiad 2025',
        description: 'A comprehensive competition covering mathematics, physics, chemistry, and biology for high school students.',
        category: 'science',
        level: 'state',
        prize_pool: 5000,
        registration_fee: 15,
        max_teams: 200,
        team_size: 1,
        current_registrations: 134,
        status: 'in_progress',
        registration_deadline: '2025-09-01',
        submission_deadline: '2025-10-15',
        results_date: '2025-10-30',
        created_at: '2025-07-15T14:30:00Z',
      },
    ];
    
    setContests(mockContests);
  }, [ngoId]);

  const createContest = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const newContest: Contest = {
      id: Date.now().toString(),
      title,
      description,
      category,
      level,
      prize_pool: parseInt(prizePool),
      registration_fee: parseInt(registrationFee),
      max_teams: parseInt(maxTeams),
      team_size: parseInt(teamSize),
      current_registrations: 0,
      status: 'upcoming',
      registration_deadline: registrationDeadline,
      submission_deadline: submissionDeadline,
      results_date: resultsDate,
      created_at: new Date().toISOString(),
    };

    setContests(prev => [newContest, ...prev]);
    
    toast({
      title: "Success",
      description: "Contest created successfully!",
    });
    
    setIsCreateModalOpen(false);
    resetForm();
    setCreating(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('science');
    setLevel('school');
    setPrizePool('1000');
    setRegistrationFee('0');
    setMaxTeams('50');
    setTeamSize('3');
    setRegistrationDeadline('');
    setSubmissionDeadline('');
    setResultsDate('');
  };

  const getCategoryIcon = (category: Contest['category']) => {
    switch (category) {
      case 'science': return '🔬';
      case 'environment': return '🌍';
      case 'innovation': return '💡';
      case 'social_impact': return '🤝';
      case 'art': return '🎨';
      case 'technology': return '💻';
    }
  };

  const getStatusColor = (status: Contest['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'registration_open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'judging': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: Contest['level']) => {
    switch (level) {
      case 'school': return 'School Level';
      case 'district': return 'District Level';
      case 'state': return 'State Level';
      case 'national': return 'National Level';
      case 'international': return 'International Level';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sponsored Contests</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Contest</DialogTitle>
              <DialogDescription>
                Sponsor a competition to engage students and schools.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createContest} className="space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title">Contest Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Green Innovation Challenge 2025"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the contest objectives and requirements..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(value: Contest['category']) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">🔬 Science</SelectItem>
                      <SelectItem value="environment">🌍 Environment</SelectItem>
                      <SelectItem value="innovation">💡 Innovation</SelectItem>
                      <SelectItem value="social_impact">🤝 Social Impact</SelectItem>
                      <SelectItem value="art">🎨 Art</SelectItem>
                      <SelectItem value="technology">💻 Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={level} onValueChange={(value: Contest['level']) => setLevel(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School Level</SelectItem>
                      <SelectItem value="district">District Level</SelectItem>
                      <SelectItem value="state">State Level</SelectItem>
                      <SelectItem value="national">National Level</SelectItem>
                      <SelectItem value="international">International Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prizePool">Prize Pool ($)</Label>
                  <Input
                    id="prizePool"
                    type="number"
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registrationFee">Registration Fee ($)</Label>
                  <Input
                    id="registrationFee"
                    type="number"
                    value={registrationFee}
                    onChange={(e) => setRegistrationFee(e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxTeams">Max Teams</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    value={maxTeams}
                    onChange={(e) => setMaxTeams(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    min="1"
                    max="10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={registrationDeadline}
                    onChange={(e) => setRegistrationDeadline(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="submissionDeadline">Submission Deadline</Label>
                  <Input
                    id="submissionDeadline"
                    type="date"
                    value={submissionDeadline}
                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultsDate">Results Date</Label>
                  <Input
                    id="resultsDate"
                    type="date"
                    value={resultsDate}
                    onChange={(e) => setResultsDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? 'Creating...' : 'Create Contest'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contests.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contests yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first contest to engage students and schools.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {contests.map((contest) => (
            <Card key={contest.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getCategoryIcon(contest.category)}</span>
                    <div>
                      <CardTitle className="text-xl">{contest.title}</CardTitle>
                      <CardDescription className="mt-1">{contest.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(contest.status)}>
                    {contest.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">${contest.prize_pool.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{contest.current_registrations}/{contest.max_teams}</p>
                      <p className="text-xs text-muted-foreground">Teams</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{getLevelLabel(contest.level)}</p>
                      <p className="text-xs text-muted-foreground">Level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">{contest.team_size} members</p>
                      <p className="text-xs text-muted-foreground">Team Size</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">${contest.registration_fee}</p>
                      <p className="text-xs text-muted-foreground">Registration</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <div>Registration: {new Date(contest.registration_deadline).toLocaleDateString()}</div>
                    <div>Submission: {new Date(contest.submission_deadline).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Submissions
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      Analytics
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