import { motion } from 'framer-motion';

interface GlowOrbProps {
  color: 'cyan' | 'magenta' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  delay?: number;
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
  xl: 'w-[500px] h-[500px]',
};

const colorClasses = {
  cyan: 'bg-glow-cyan',
  magenta: 'bg-glow-magenta',
  purple: 'bg-glow-purple',
};

export const GlowOrb = ({ color, size = 'md', className = '', delay = 0 }: GlowOrbProps) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] opacity-30 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};
