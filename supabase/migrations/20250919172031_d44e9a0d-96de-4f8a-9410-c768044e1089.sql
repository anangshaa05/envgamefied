-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'ngo');

-- Create enum for NGO types
CREATE TYPE public.ngo_type AS ENUM ('education', 'welfare', 'stem_outreach', 'environmental', 'community_development', 'other');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teacher profiles table
CREATE TABLE public.teacher_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  verification_document_url TEXT,
  school_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create NGO profiles table  
CREATE TABLE public.ngo_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  ngo_type ngo_type NOT NULL,
  official_email TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  verification_document_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.teacher_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  class_code TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create class enrollments table
CREATE TABLE public.class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for teacher profiles
CREATE POLICY "Anyone can view teacher profiles" ON public.teacher_profiles FOR SELECT USING (true);
CREATE POLICY "Teachers can update own profile" ON public.teacher_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Teachers can insert own profile" ON public.teacher_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for NGO profiles
CREATE POLICY "Anyone can view NGO profiles" ON public.ngo_profiles FOR SELECT USING (true);
CREATE POLICY "NGOs can update own profile" ON public.ngo_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "NGOs can insert own profile" ON public.ngo_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for classes
CREATE POLICY "Anyone can view classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Teachers can manage own classes" ON public.classes FOR ALL USING (auth.uid() = teacher_id);

-- RLS Policies for class enrollments
CREATE POLICY "Anyone can view enrollments" ON public.class_enrollments FOR SELECT USING (true);
CREATE POLICY "Students can enroll themselves" ON public.class_enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Teachers can manage enrollments in their classes" ON public.class_enrollments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.classes WHERE id = class_id AND teacher_id = auth.uid())
);

-- Function to generate unique class codes
CREATE OR REPLACE FUNCTION generate_class_code() RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) from 1 for 6));
    SELECT EXISTS(SELECT 1 FROM public.classes WHERE class_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate class codes
CREATE OR REPLACE FUNCTION set_class_code() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.class_code IS NULL OR NEW.class_code = '' THEN
    NEW.class_code := generate_class_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_class_code
  BEFORE INSERT ON public.classes
  FOR EACH ROW EXECUTE FUNCTION set_class_code();

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();