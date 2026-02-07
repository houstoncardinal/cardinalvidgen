import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Wand2, Code, Palette, Zap, 
  Settings2, Sliders, ChevronDown, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const vibeOptions = [
  { id: 'matrix', label: 'Matrix', icon: Code, color: 'from-green-500 to-emerald-600' },
  { id: 'neon', label: 'Neon Glow', icon: Sparkles, color: 'from-cyan-500 to-fuchsia-500' },
  { id: 'minimal', label: 'Minimal', icon: Palette, color: 'from-gray-400 to-gray-600' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: Zap, color: 'from-pink-500 to-yellow-500' },
];

const codeLanguages = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'react', label: 'React/JSX' },
  { id: 'python', label: 'Python' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' },
];

const resolutions = [
  { id: '720p', label: '720p' },
  { id: '1080p', label: '1080p' },
  { id: '4k', label: '4K' },
];

interface AlgorithmSettings {
  codeStyle: string;
  animationSpeed: number;
  particleDensity: 'low' | 'medium' | 'high';
  glowIntensity: number;
  syntaxTheme: string;
  cameraMovement: string;
  transitionType: string;
  resolution: string;
  fps: number;
  duration: number;
  backgroundType: string;
  soundEnabled: boolean;
}

interface AdvancedPromptInputProps {
  onGenerate: (projectId: string, script: any) => void;
}

export const AdvancedPromptInput = ({ onGenerate }: AdvancedPromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('neon');
  const [isFocused, setIsFocused] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const [settings, setSettings] = useState<AlgorithmSettings>({
    codeStyle: 'typescript',
    animationSpeed: 1.0,
    particleDensity: 'medium',
    glowIntensity: 0.8,
    syntaxTheme: 'monokai',
    cameraMovement: 'smooth',
    transitionType: 'fade',
    resolution: '1080p',
    fps: 60,
    duration: 30,
    backgroundType: 'gradient',
    soundEnabled: true,
  });

  const updateSetting = <K extends keyof AlgorithmSettings>(key: K, value: AlgorithmSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Create project first
      const { data: project, error: projectError } = await supabase
        .from('video_projects')
        .insert([{
          prompt,
          style: selectedVibe,
          algorithm_settings: settings as any,
          status: 'processing',
        }])
        .select()
        .single();

      if (projectError) throw projectError;

      setGenerationProgress(20);
      toast.info('🎬 Analyzing your prompt...');

      // Simulate progress while waiting for AI
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 5, 85));
      }, 500);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: {
          prompt,
          style: selectedVibe,
          settings,
          projectId: project.id,
        },
      });

      clearInterval(progressInterval);

      if (error) throw error;

      setGenerationProgress(100);
      
      if (data.success) {
        toast.success('🎉 Video script generated!');
        onGenerate(project.id, data.script);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate video');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main input container */}
      <motion.div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused ? 'glow-mixed' : ''
        }`}
        animate={{ scale: isFocused ? 1.02 : 1 }}
      >
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
        
        <div className="relative glass-strong rounded-2xl p-3">
          <div className="flex flex-col gap-3">
            {/* Text input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your video... e.g., 'A React authentication hook with JWT token handling'"
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-4 py-3 text-base resize-none min-h-[80px]"
              rows={2}
            />
            
            {/* Bottom bar */}
            <div className="flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                {/* Vibe selector */}
                {vibeOptions.map((vibe) => {
                  const Icon = vibe.icon;
                  const isSelected = selectedVibe === vibe.id;
                  return (
                    <motion.button
                      key={vibe.id}
                      onClick={() => setSelectedVibe(vibe.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${vibe.color} text-white`
                          : 'glass text-muted-foreground hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {vibe.label}
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-muted-foreground"
                >
                  <Settings2 className="w-4 h-4 mr-1" />
                  Advanced
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </Button>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      {generationProgress}%
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Generating video script...</span>
                <span className="text-sm font-mono text-primary">{generationProgress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${generationProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {generationProgress < 30 && '🔍 Analyzing prompt...'}
                  {generationProgress >= 30 && generationProgress < 60 && '🎨 Designing scenes...'}
                  {generationProgress >= 60 && generationProgress < 85 && '✨ Adding effects...'}
                  {generationProgress >= 85 && '🎬 Finalizing script...'}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced settings panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                Advanced Algorithm Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Code Language */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Code Language</label>
                  <div className="flex flex-wrap gap-2">
                    {codeLanguages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => updateSetting('codeStyle', lang.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          settings.codeStyle === lang.id
                            ? 'bg-primary text-primary-foreground'
                            : 'glass text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Resolution</label>
                  <div className="flex gap-2">
                    {resolutions.map((res) => (
                      <button
                        key={res.id}
                        onClick={() => updateSetting('resolution', res.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          settings.resolution === res.id
                            ? 'bg-primary text-primary-foreground'
                            : 'glass text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation Speed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Animation Speed</label>
                    <span className="text-xs font-mono text-primary">{settings.animationSpeed.toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={[settings.animationSpeed]}
                    onValueChange={([v]) => updateSetting('animationSpeed', v)}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Glow Intensity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Glow Intensity</label>
                    <span className="text-xs font-mono text-primary">{Math.round(settings.glowIntensity * 100)}%</span>
                  </div>
                  <Slider
                    value={[settings.glowIntensity]}
                    onValueChange={([v]) => updateSetting('glowIntensity', v)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Duration</label>
                    <span className="text-xs font-mono text-primary">{settings.duration}s</span>
                  </div>
                  <Slider
                    value={[settings.duration]}
                    onValueChange={([v]) => updateSetting('duration', v)}
                    min={15}
                    max={60}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* FPS */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Frame Rate</label>
                    <span className="text-xs font-mono text-primary">{settings.fps} FPS</span>
                  </div>
                  <Slider
                    value={[settings.fps]}
                    onValueChange={([v]) => updateSetting('fps', v)}
                    min={30}
                    max={120}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Particle Density */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Particle Density</label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((density) => (
                      <button
                        key={density}
                        onClick={() => updateSetting('particleDensity', density)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          settings.particleDensity === density
                            ? 'bg-primary text-primary-foreground'
                            : 'glass text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Enable Sound Effects</label>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(v) => updateSetting('soundEnabled', v)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick suggestions */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs text-muted-foreground">Try:</span>
        {[
          'React state management with hooks',
          'REST API with error handling',
          'Authentication flow with JWT',
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setPrompt(suggestion)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline"
          >
            {suggestion}
          </button>
        ))}
      </motion.div>
    </div>
  );
};
