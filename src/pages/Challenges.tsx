import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, Clock, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Card from "@/components/Card";
import { challenges } from "@/data/mockData";

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Challenges");
  const [completedChallenges, setCompletedChallenges] = useState(
    new Set(challenges.filter(c => c.submitted).map(c => c.id))
  );
  
  const categories = [...new Set(challenges.map(challenge => challenge.category))] as string[];
  
  const filteredChallenges = selectedCategory === "All Challenges" 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory);
  
  const difficultyColors = {
    Easy: "bg-success text-success-foreground",
    Medium: "bg-warning text-warning-foreground", 
    Hard: "bg-destructive text-destructive-foreground"
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleSubmitProof = () => {
    // Mock submission - in a real app this would upload to backend
    console.log("Challenge proof submitted:", selectedChallenge?.id, uploadedImage);
    
    // Update challenge status locally
    if (selectedChallenge) {
      const updatedChallenges = challenges.map(c => 
        c.id === selectedChallenge.id 
          ? { ...c, submitted: true, proofImageUrl: uploadedImage }
          : c
      );
      console.log("Updated challenges:", updatedChallenges);
    }
    
    setUploadedImage(null);
    setSelectedChallenge(null);
    
    // Show success feedback
    alert("Challenge proof submitted successfully! You earned " + selectedChallenge?.points + " points!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-4">Environmental Challenges</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Take on real-world environmental challenges and make a measurable impact! 
            Complete tasks, submit proof, and earn points while helping the planet. 🌍
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="challenge" className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {challenges.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Challenges</div>
            </Card>
            <Card variant="challenge" className="p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {challenges.filter(c => c.submitted).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
            <Card variant="challenge" className="p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {challenges.filter(c => !c.submitted).length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </Card>
            <Card variant="challenge" className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {challenges.reduce((sum, c) => c.submitted ? sum + c.points : sum, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </Card>
          </div>
        </motion.section>

        {/* Category Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === "All Challenges" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSelectedCategory("All Challenges")}
            >
              All Challenges
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Challenges Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card 
                  variant="challenge" 
                  className={`p-6 ${challenge.submitted ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge 
                      className={`${difficultyColors[challenge.difficulty]} text-xs font-medium`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        +{challenge.points}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {challenge.description}
                  </p>

                  {/* Submitted Proof */}
                  {challenge.submitted && challenge.proofImageUrl && (
                    <div className="mb-4">
                      <img 
                        src={challenge.proofImageUrl}
                        alt="Challenge proof"
                        className="w-full h-32 object-cover rounded-lg border border-success/20"
                      />
                      <div className="flex items-center space-x-2 mt-2 text-success text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Proof submitted</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due {new Date(challenge.deadline).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>

                  {challenge.submitted ? (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedChallenge(challenge)}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Submit Challenge Proof</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">
                              {selectedChallenge?.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedChallenge?.description}
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="proof-image">Upload Photo Evidence</Label>
                            <Input
                              id="proof-image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="mt-1"
                            />
                          </div>
                          
                          {uploadedImage && (
                            <div>
                              <img 
                                src={uploadedImage}
                                alt="Proof preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          
                          <div>
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                              id="description"
                              placeholder="Tell us more about your challenge completion..."
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => {
                                setUploadedImage(null);
                                setSelectedChallenge(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="flex-1" 
                              onClick={handleSubmitProof}
                              disabled={!uploadedImage}
                            >
                              Submit Proof
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
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
          className="mt-16 text-center"
        >
          <Card variant="default" className="p-8 bg-gradient-hero text-white">
            <h2 className="text-2xl font-bold mb-4">Ready for More Challenges?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              New challenges are added weekly! Join our community to suggest new environmental tasks and compete with others.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Join Community
            </Button>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Challenges;