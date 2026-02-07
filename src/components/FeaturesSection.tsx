import { motion } from 'framer-motion';
import { 
  Zap, Palette, Wand2, Film, Code2, 
  Layers, Sparkles, Clock, Download 
} from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    description: 'Describe your vision and watch as AI creates stunning code videos in seconds.',
    color: 'from-primary to-primary/50',
  },
  {
    icon: Palette,
    title: '50+ Vibe Styles',
    description: 'From Matrix-inspired to minimal aesthetics. Find the perfect style for your content.',
    color: 'from-secondary to-secondary/50',
  },
  {
    icon: Code2,
    title: 'Syntax Highlighting',
    description: 'Beautiful, accurate syntax highlighting for 100+ programming languages.',
    color: 'from-glow-purple to-glow-purple/50',
  },
  {
    icon: Film,
    title: '4K Export',
    description: 'Export in stunning 4K resolution, perfect for YouTube, TikTok, and more.',
    color: 'from-primary to-secondary',
  },
  {
    icon: Clock,
    title: 'Real-Time Preview',
    description: 'See changes instantly as you customize your video in real-time.',
    color: 'from-secondary to-glow-purple',
  },
  {
    icon: Layers,
    title: 'Scene Templates',
    description: 'Start with pre-built scenes or create your own custom templates.',
    color: 'from-glow-purple to-primary',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Everything You Need to </span>
            <span className="text-gradient">Create Magic</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for creators who demand excellence. 
            Build viral content with our industry-leading tools.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:bg-white/5 group-hover:border-primary/30">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 transition-transform duration-500 group-hover:scale-110`}>
          <Icon className="w-full h-full text-primary-foreground" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl" />
        </div>
      </div>
    </motion.div>
  );
};
