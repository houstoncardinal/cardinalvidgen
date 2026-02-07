-- Create video projects table
CREATE TABLE public.video_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL DEFAULT 'neon',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- Advanced Algorithm Settings
  algorithm_settings JSONB NOT NULL DEFAULT '{
    "codeStyle": "typescript",
    "animationSpeed": 1.0,
    "particleDensity": "medium",
    "glowIntensity": 0.8,
    "syntaxTheme": "monokai",
    "cameraMovement": "smooth",
    "transitionType": "fade",
    "resolution": "1080p",
    "fps": 60,
    "duration": 30,
    "backgroundType": "gradient",
    "soundEnabled": true
  }'::jsonb,
  
  -- Generated content
  generated_script JSONB,
  video_url TEXT,
  thumbnail_url TEXT,
  
  -- Metadata
  duration_seconds INTEGER DEFAULT 30,
  resolution TEXT DEFAULT '1080p',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create video scenes table for detailed frame-by-frame control
CREATE TABLE public.video_scenes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.video_projects(id) ON DELETE CASCADE,
  scene_order INTEGER NOT NULL,
  scene_type TEXT NOT NULL CHECK (scene_type IN ('intro', 'code_typing', 'code_reveal', 'transition', 'highlight', 'zoom', 'outro')),
  
  -- Scene content
  code_content TEXT,
  language TEXT DEFAULT 'typescript',
  
  -- Animation settings
  animation_config JSONB NOT NULL DEFAULT '{
    "typeSpeed": 50,
    "cursorStyle": "block",
    "highlightLines": [],
    "focusArea": null,
    "cameraZoom": 1.0,
    "particles": true,
    "glowEffect": true
  }'::jsonb,
  
  -- Timing
  start_time_ms INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER NOT NULL DEFAULT 3000,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create video templates table for reusable vibe styles
CREATE TABLE public.video_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  style TEXT NOT NULL,
  preview_url TEXT,
  
  -- Template configuration
  default_settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  scene_templates JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  is_public BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create video generations log for tracking AI usage
CREATE TABLE public.video_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.video_projects(id) ON DELETE SET NULL,
  
  -- AI Generation details
  model_used TEXT NOT NULL DEFAULT 'google/gemini-3-flash-preview',
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'started',
  error_message TEXT,
  processing_time_ms INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_generations ENABLE ROW LEVEL SECURITY;

-- Public read access for templates
CREATE POLICY "Templates are viewable by everyone" 
ON public.video_templates 
FOR SELECT 
USING (is_public = true);

-- Public access for video projects (no auth required for demo)
CREATE POLICY "Anyone can create video projects" 
ON public.video_projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view video projects" 
ON public.video_projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their video projects" 
ON public.video_projects 
FOR UPDATE 
USING (true);

-- Public access for video scenes
CREATE POLICY "Anyone can create video scenes" 
ON public.video_scenes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view video scenes" 
ON public.video_scenes 
FOR SELECT 
USING (true);

-- Public access for generations log
CREATE POLICY "Anyone can create generations" 
ON public.video_generations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view generations" 
ON public.video_generations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update generations" 
ON public.video_generations 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_video_projects_updated_at
BEFORE UPDATE ON public.video_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default templates
INSERT INTO public.video_templates (name, description, style, default_settings, scene_templates) VALUES
('Matrix Rain', 'Classic green matrix code rain with typing effects', 'matrix', 
 '{"codeStyle": "typescript", "glowIntensity": 0.9, "particleDensity": "high", "syntaxTheme": "matrix", "backgroundType": "matrix_rain"}',
 '[{"type": "intro", "duration_ms": 2000}, {"type": "code_typing", "duration_ms": 8000}, {"type": "outro", "duration_ms": 2000}]'),
 
('Neon Glow', 'Vibrant neon colors with smooth glow effects', 'neon',
 '{"codeStyle": "typescript", "glowIntensity": 1.0, "particleDensity": "medium", "syntaxTheme": "monokai", "backgroundType": "gradient"}',
 '[{"type": "intro", "duration_ms": 3000}, {"type": "code_reveal", "duration_ms": 10000}, {"type": "outro", "duration_ms": 2000}]'),
 
('Cyberpunk', 'Futuristic cyberpunk aesthetic with glitch effects', 'cyberpunk',
 '{"codeStyle": "typescript", "glowIntensity": 0.85, "particleDensity": "high", "syntaxTheme": "cyberpunk", "backgroundType": "cityscape", "glitchEffect": true}',
 '[{"type": "intro", "duration_ms": 2500}, {"type": "code_typing", "duration_ms": 12000}, {"type": "highlight", "duration_ms": 3000}, {"type": "outro", "duration_ms": 2500}]'),
 
('Minimal', 'Clean, minimal aesthetic with subtle animations', 'minimal',
 '{"codeStyle": "typescript", "glowIntensity": 0.3, "particleDensity": "low", "syntaxTheme": "github", "backgroundType": "solid"}',
 '[{"type": "code_typing", "duration_ms": 15000}]');
