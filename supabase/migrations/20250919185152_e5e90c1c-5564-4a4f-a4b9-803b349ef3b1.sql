-- Create announcements table for teacher-class communications
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL,
  class_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for announcements
CREATE POLICY "Teachers can manage their own announcements" 
ON public.announcements 
FOR ALL
USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view announcements for their enrolled classes" 
ON public.announcements 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM class_enrollments 
    WHERE class_enrollments.class_id = announcements.class_id 
    AND class_enrollments.student_id = auth.uid()
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();