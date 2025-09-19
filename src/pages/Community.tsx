import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, Pin, Users, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Card from "@/components/Card";
import LevelPill from "@/components/LevelPill";
import { communityPosts, campaigns } from "@/data/mockData";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [posts, setPosts] = useState(communityPosts);

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleSharePost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: Date.now().toString(),
        author: {
          name: "You",
          level: 5,
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        pinned: false,
        imageUrl: null
      };
      setPosts([newPostData, ...posts]);
      setNewPost("");
      alert("Post shared successfully!");
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Community Hub</h1>
              <p className="text-muted-foreground">
                Connect with fellow eco-warriors, share your achievements, and stay updated on campaigns! 🌍
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hidden sm:flex bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share with the Community</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's your latest eco-achievement? Share your progress, tips, or ask questions..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Add Photo
                    </Button>
                    <Button className="flex-1" onClick={handleSharePost}>
                      Share Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Active Campaigns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Active Campaigns</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card variant="community" className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{campaign.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{campaign.participants.toLocaleString()} participants</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-full h-2 mb-2">
                    <div 
                      className="bg-success h-full rounded-full transition-all duration-500"
                      style={{ width: `${(campaign.progress / campaign.goal) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{campaign.progress.toLocaleString()} / {campaign.goal.toLocaleString()}</span>
                    <span>{Math.round((campaign.progress / campaign.goal) * 100)}%</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Feed */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Community Feed</h2>
            <Button variant="outline" size="sm" className="sm:hidden bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-md hover:shadow-lg transition-all duration-300">
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card variant="community" className={`p-6 ${post.pinned ? 'border-primary/50 bg-primary/5' : ''}`}>
                  {post.pinned && (
                    <div className="flex items-center space-x-2 mb-4 text-primary text-sm">
                      <Pin className="w-4 h-4" />
                      <span className="font-medium">Pinned Post</span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border shadow-soft">
                      <img 
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                        <LevelPill level={post.author.level} size="sm" />
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(post.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-foreground mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      
                      {post.imageUrl && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={post.imageUrl}
                            alt="Post image"
                            className="w-full max-h-80 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`p-0 h-auto ${
                            likedPosts.has(post.id) ? 'text-red-500' : 'text-muted-foreground'
                          } hover:text-red-500`}
                        >
                          <Heart 
                            className={`w-5 h-5 mr-2 ${
                              likedPosts.has(post.id) ? 'fill-current' : ''
                            }`} 
                          />
                          <span className="text-sm">
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-primary"
                        >
                          <MessageSquare className="w-5 h-5 mr-2" />
                          <span className="text-sm">{post.comments}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-primary"
                        >
                          <Share2 className="w-5 h-5 mr-1" />
                          <span className="text-sm">Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card variant="default" className="p-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Join the Conversation!</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Share your eco-journey, inspire others, and learn from the community. Together we can make a bigger impact!
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Share Your Story
            </Button>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Community;