import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import { lessons } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Lessons");
  const { toast } = useToast();
  const categories = [...new Set(lessons.map(lesson => lesson.category))] as string[];
  
  const filteredLessons = selectedCategory === "All Lessons" 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Filter Applied",
      description: `Showing ${category === "All Lessons" ? "all" : category} lessons`,
    });
  };

  const handleLessonStart = (lessonId: string, lessonTitle: string) => {
    toast({
      title: "Lesson Started!",
      description: `Starting "${lessonTitle}". Good luck with your learning!`,
    });
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Learning Hub</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Expand your environmental knowledge through interactive lessons, quizzes, and practical guides. 
            Each lesson brings you closer to becoming an eco-expert! 🌱
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="lesson" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {lessons.filter(l => l.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-1">
                  {lessons.filter(l => !l.completed && l.progress > 0).length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">
                  {Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </Card>
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
              variant={selectedCategory === "All Lessons" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleCategoryClick("All Lessons")}
            >
              All Lessons
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Lessons Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card 
                  variant="lesson" 
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => {}}
                >
                  <Link to={`/learning/${lesson.id}`}>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Completion Status */}
                      <div className="absolute top-3 right-3">
                        {lesson.completed ? (
                          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        ) : lesson.progress > 0 ? (
                          <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-muted/80 rounded-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="text-xs">
                          {lesson.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {lesson.summary}
                      </p>
                      
                      {/* Progress Bar */}
                      {lesson.progress > 0 && !lesson.completed && (
                        <div className="mb-4">
                          <ProgressBar
                            progress={lesson.progress}
                            variant="default"
                            showPercentage={false}
                            size="sm"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.estimatedTime} min</span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant={lesson.completed ? "outline" : "default"}
                          className="group-hover:translate-x-1 transition-transform"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLessonStart(lesson.id, lesson.title);
                          }}
                        >
                          {lesson.completed ? "Review" : lesson.progress > 0 ? "Continue" : "Start"}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Link>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Become an Eco-Expert?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Complete all lessons to unlock advanced environmental courses and earn exclusive badges!
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Continue Learning Journey
            </Button>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default LearningHub;