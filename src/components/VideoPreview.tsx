import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Maximize, Download,
  Settings, Layers, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoScene {
  type: string;
  duration_ms: number;
  code_content?: string;
  animation_config: any;
  visual_effects: any;
}

interface VideoScript {
  metadata: {
    title: string;
    description: string;
    total_duration_ms: number;
    resolution: string;
    fps: number;
    aspect_ratio: string;
  };
  scenes: VideoScene[];
  color_palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    glow: string;
  };
  particle_system: {
    enabled: boolean;
    count: number;
    speed: number;
    colors: string[];
    behavior: string;
  };
}

interface VideoPreviewProps {
  script: VideoScript | null;
  projectId: string;
}

export const VideoPreview = ({ script, projectId }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const totalDuration = script?.metadata.total_duration_ms || 30000;

  // Particle system
  useEffect(() => {
    if (!script?.particle_system.enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < script.particle_system.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * script.particle_system.speed,
        vy: script.particle_system.behavior === 'rain' 
          ? Math.random() * 2 + 1 
          : (Math.random() - 0.5) * script.particle_system.speed,
        size: Math.random() * 3 + 1,
        color: script.particle_system.colors[Math.floor(Math.random() * script.particle_system.colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [script]);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 100;
        if (next >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Update current scene based on time
  useEffect(() => {
    if (!script?.scenes) return;

    let elapsed = 0;
    for (let i = 0; i < script.scenes.length; i++) {
      elapsed += script.scenes[i].duration_ms;
      if (currentTime < elapsed) {
        setCurrentSceneIndex(i);
        break;
      }
    }
  }, [currentTime, script]);

  // Typing animation
  useEffect(() => {
    if (!script?.scenes || !isPlaying) return;

    const currentScene = script.scenes[currentSceneIndex];
    if (!currentScene?.code_content) {
      setTypedCode('');
      return;
    }

    const code = currentScene.code_content;
    const sceneStartTime = script.scenes
      .slice(0, currentSceneIndex)
      .reduce((acc, s) => acc + s.duration_ms, 0);
    const sceneProgress = (currentTime - sceneStartTime) / currentScene.duration_ms;
    const charsToShow = Math.floor(code.length * Math.min(sceneProgress, 1));
    
    setTypedCode(code.substring(0, charsToShow));
  }, [currentTime, currentSceneIndex, script, isPlaying]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentScene = script?.scenes?.[currentSceneIndex];

  if (!script) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Video Script</h3>
        <p className="text-muted-foreground text-sm">Generate a video to see the preview here</p>
      </div>
    );
  }

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Video canvas */}
      <div 
        className="relative aspect-[9/16] max-h-[500px] overflow-hidden"
        style={{ backgroundColor: script.color_palette.background }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          width={360}
          height={640}
        />

        {/* Code display */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {currentScene?.code_content && (
              <motion.div
                key={currentSceneIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full"
              >
                <pre
                  className="font-mono text-xs md:text-sm p-4 rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: script.color_palette.text,
                    textShadow: currentScene.animation_config?.glowEffect 
                      ? `0 0 10px ${script.color_palette.glow}` 
                      : 'none',
                  }}
                >
                  <code>
                    {typedCode}
                    <span className="animate-pulse">|</span>
                  </code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scene indicator */}
        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs">
          Scene {currentSceneIndex + 1}/{script.scenes.length}
        </div>

        {/* Effects indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {script.particle_system.enabled && (
            <div className="glass rounded-full p-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-white/10">
        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            onValueChange={([v]) => setCurrentTime(v)}
            max={totalDuration}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentTime(Math.max(0, currentTime - 5000))}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              variant="hero"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 5000))}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scene timeline */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Scenes</span>
        </div>
        <div className="flex gap-1">
          {script.scenes.map((scene, index) => (
            <motion.button
              key={index}
              onClick={() => {
                const time = script.scenes
                  .slice(0, index)
                  .reduce((acc, s) => acc + s.duration_ms, 0);
                setCurrentTime(time);
              }}
              className={`flex-1 h-8 rounded-lg text-xs font-medium transition-all ${
                index === currentSceneIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {scene.type.replace('_', ' ')}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Export button */}
      <div className="p-4 border-t border-white/10">
        <Button variant="glow" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Export Video (Coming Soon)
        </Button>
      </div>
    </motion.div>
  );
};
