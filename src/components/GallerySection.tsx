import { motion } from 'framer-motion';
import { Play, Heart, Eye, Sparkles } from 'lucide-react';
import { useState } from 'react';

const videos = [
  {
    id: 1,
    title: 'React Hooks Animation',
    style: 'Neon Glow',
    views: '1.2M',
    likes: '45K',
    gradient: 'from-primary/80 to-secondary/80',
  },
  {
    id: 2,
    title: 'TypeScript Magic',
    style: 'Matrix',
    views: '890K',
    likes: '32K',
    gradient: 'from-emerald-500/80 to-primary/80',
  },
  {
    id: 3,
    title: 'CSS Transitions',
    style: 'Cyberpunk',
    views: '2.1M',
    likes: '78K',
    gradient: 'from-secondary/80 to-glow-purple/80',
  },
  {
    id: 4,
    title: 'API Integration',
    style: 'Minimal',
    views: '567K',
    likes: '21K',
    gradient: 'from-slate-600/80 to-primary/80',
  },
  {
    id: 5,
    title: 'Dark Mode Toggle',
    style: 'Neon Glow',
    views: '1.5M',
    likes: '56K',
    gradient: 'from-glow-purple/80 to-primary/80',
  },
  {
    id: 6,
    title: 'Loading States',
    style: 'Cyberpunk',
    views: '923K',
    likes: '34K',
    gradient: 'from-primary/80 to-emerald-500/80',
  },
];

export const GallerySection = () => {
  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
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
            <span className="text-sm text-muted-foreground">Gallery</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">See What's </span>
            <span className="text-gradient">Possible</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore stunning code videos created by our community. 
            Get inspired and start creating your own masterpiece.
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface VideoCardProps {
  video: typeof videos[0];
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video thumbnail */}
      <div className="relative aspect-video rounded-2xl overflow-hidden glass">
        {/* Gradient placeholder */}
        <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`} />
        
        {/* Code overlay effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-mono text-white/20 text-xs transform -rotate-12 scale-150 select-none whitespace-pre">
            {`const ${video.title.toLowerCase().replace(/\s/g, '')} = () => {\n  return <Component />;\n};`}
          </div>
        </div>
        
        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
        </motion.div>

        {/* Style badge */}
        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs text-foreground">
          {video.style}
        </div>
      </div>

      {/* Video info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {video.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {video.likes}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
