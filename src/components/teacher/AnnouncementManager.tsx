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
import { Plus, Megaphone, Calendar, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'general' | 'assignment' | 'reminder' | 'event';
  created_at: string;
  is_pinned: boolean;
}

interface AnnouncementManagerProps {
  classId: string;
  className: string;
}

export default function AnnouncementManager({ classId, className }: AnnouncementManagerProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Announcement['priority']>('medium');
  const [type, setType] = useState<Announcement['type']>('general');

  useEffect(() => {
    // Mock data for now
    const mockAnnouncements: Announcement[] = [
      {
        id: '1',
        title: 'Welcome to Environmental Science!',
        content: 'Welcome everyone to our Environmental Science class. We\'ll be exploring climate change, renewable energy, and sustainable practices this semester.',
        priority: 'medium',
        type: 'general',
        created_at: '2025-09-15T10:00:00Z',
        is_pinned: true,
      },
      {
        id: '2',
        title: 'Climate Project Due Next Week',
        content: 'Don\'t forget that your climate change research projects are due next Friday. Make sure to include at least 3 credible sources.',
        priority: 'high',
        type: 'assignment',
        created_at: '2025-09-18T14:30:00Z',
        is_pinned: false,
      },
    ];
    
    setAnnouncements(mockAnnouncements);
  }, [classId]);

  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title,
      content,
      priority,
      type,
      created_at: new Date().toISOString(),
      is_pinned: false,
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    
    toast({
      title: "Success",
      description: "Announcement posted successfully!",
    });
    
    setIsCreateModalOpen(false);
    resetForm();
    setCreating(false);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPriority('medium');
    setType('general');
  };

  const getPriorityIcon = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Info className="h-4 w-4 text-blue-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getTypeEmoji = (type: Announcement['type']) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'reminder': return '⏰';
      case 'event': return '📅';
      default: return '📢';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Announcements for {className}</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Post an announcement to your class.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createAnnouncement} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Announcement title..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={(value: Announcement['type']) => setType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">📢 General</SelectItem>
                      <SelectItem value="assignment">📝 Assignment</SelectItem>
                      <SelectItem value="reminder">⏰ Reminder</SelectItem>
                      <SelectItem value="event">📅 Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={(value: Announcement['priority']) => setPriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your announcement..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? 'Posting...' : 'Post Announcement'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {announcements.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No announcements yet</h3>
            <p className="text-muted-foreground mb-4">
              Keep your students informed with class announcements.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`${announcement.is_pinned ? 'border-primary' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getTypeEmoji(announcement.type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        {announcement.is_pinned && <Badge variant="secondary">Pinned</Badge>}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(announcement.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(announcement.priority)}
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{announcement.content}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    {announcement.is_pinned ? 'Unpin' : 'Pin'}
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}