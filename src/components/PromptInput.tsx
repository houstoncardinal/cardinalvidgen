import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const vibeOptions = [
  { id: 'matrix', label: 'Matrix', icon: Code },
  { id: 'neon', label: 'Neon Glow', icon: Sparkles },
  { id: 'minimal', label: 'Minimal', icon: Palette },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: Zap },
];

export const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('neon');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main input container */}
      <motion.div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused ? 'glow-mixed' : ''
        }`}
        animate={{ scale: isFocused ? 1.02 : 1 }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
        
        <div className="relative glass-strong rounded-2xl p-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Describe your video... e.g., 'A React component building animation'"
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-4 py-3 text-base"
              />
            </div>
            <Button variant="hero" size="lg" className="shrink-0" onClick={() => navigate('/generator')}>
              <Wand2 className="w-5 h-5" />
              Generate
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Vibe selector */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm text-muted-foreground mr-2">Style:</span>
        {vibeOptions.map((vibe) => {
          const Icon = vibe.icon;
          return (
            <motion.button
              key={vibe.id}
              onClick={() => setSelectedVibe(vibe.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedVibe === vibe.id
                  ? 'bg-primary/20 text-primary border border-primary/50'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              {vibe.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Quick suggestions */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs text-muted-foreground">Try:</span>
        {['API integration flow', 'Dark mode toggle', 'Loading animation'].map((suggestion) => (
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
