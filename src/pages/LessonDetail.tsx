import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, Play, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import { lessons, challenges } from "@/data/mockData";

const LessonDetail = () => {
  const { id } = useParams();
  const lesson = lessons.find(l => l.id === id);
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Lesson Not Found</h1>
          <Button asChild>
            <Link to="/learning">Back to Learning Hub</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedChallenges = challenges.filter(c => 
    c.category.toLowerCase().includes(lesson.category.toLowerCase()) ||
    lesson.category.toLowerCase().includes(c.category.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/learning" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learning Hub</span>
            </Link>
          </Button>
        </motion.div>

        {/* Lesson Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="aspect-video rounded-xl overflow-hidden mb-6 shadow-hover">
            <img 
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3">
                {lesson.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-3">{lesson.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{lesson.summary}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{lesson.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {lesson.completed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-success">Completed</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-primary" />
                      <span className="text-primary">
                        {lesson.progress > 0 ? "In Progress" : "Not Started"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {lesson.progress > 0 && (
            <div className="mb-6">
              <ProgressBar
                progress={lesson.progress}
                variant="default"
                label="Lesson Progress"
              />
            </div>
          )}
        </motion.section>

        {/* Lesson Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="lesson" className="p-8">
            <div className="prose prose-lg max-w-none">
              <h2>What You'll Learn</h2>
              <ul>
                <li>Understanding the fundamentals of renewable energy sources</li>
                <li>Environmental benefits of solar, wind, and hydroelectric power</li>
                <li>How renewable energy impacts climate change mitigation</li>
                <li>Practical steps to support renewable energy adoption</li>
              </ul>
              
              <h2>Interactive Content</h2>
              <div className="bg-muted/50 rounded-lg p-6 my-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Interactive Lesson</h3>
                  <p className="text-muted-foreground mb-4">
                    Engage with our interactive content to deepen your understanding
                  </p>
                  <Button>
                    {lesson.progress > 0 ? "Continue Lesson" : "Start Interactive Lesson"}
                  </Button>
                </div>
              </div>

              <h2>Key Takeaways</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <h4 className="font-semibold text-success mb-2">Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Renewable energy reduces greenhouse gas emissions by up to 90% compared to fossil fuels.
                  </p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">Economic Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    Solar and wind are now the cheapest sources of power in most parts of the world.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Action Buttons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              {lesson.completed ? "Review Quiz" : "Take Quiz"}
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Download Resources
            </Button>
          </div>
        </motion.section>

        {/* Related Challenges */}
        {relatedChallenges.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedChallenges.map((challenge) => (
                <Card key={challenge.id} variant="challenge" className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      +{challenge.points} points
                    </span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/challenges">View Challenge</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;