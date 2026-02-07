import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  'const generate = async () => {',
  '  await ai.createVideo({',
  '    style: "vibe",',
  '    effects: ["glow", "particles"],',
  '  });',
  '};',
  'function render(frame) {',
  '  ctx.drawImage(frame);',
  '  applyShader(bloom);',
  '}',
  'export default VideoGen;',
  'import { motion } from "fm";',
  'const fps = 60;',
  'let timeline = [];',
  'encoder.encode(buffer);',
  '<Canvas ref={ref} />',
];

interface CodeLineProps {
  text: string;
  delay: number;
  duration: number;
  left: string;
}

const CodeLine = ({ text, delay, duration, left }: CodeLineProps) => {
  return (
    <motion.div
      className="absolute font-mono text-xs whitespace-nowrap opacity-20 text-primary pointer-events-none select-none"
      style={{ left }}
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ 
        y: '100vh',
        opacity: [0, 0.3, 0.3, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {text}
    </motion.div>
  );
};

export const CodeRain = () => {
  const lines = Array.from({ length: 20 }, (_, i) => ({
    text: codeSnippets[i % codeSnippets.length],
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    left: `${(i / 20) * 100}%`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, i) => (
        <CodeLine key={i} {...line} />
      ))}
    </div>
  );
};
