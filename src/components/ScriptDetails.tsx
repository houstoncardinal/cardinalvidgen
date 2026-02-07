import { motion } from 'framer-motion';
import { Code2, Palette, Sparkles, Layers, Zap, Clock } from 'lucide-react';

interface ScriptDetailsProps {
  script: any;
}

export const ScriptDetails = ({ script }: ScriptDetailsProps) => {
  if (!script) return null;

  return (
    <motion.div
      className="glass rounded-2xl p-6 space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Generated Script Details
        </h3>
        <p className="text-sm text-muted-foreground">{script.metadata?.description}</p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <DetailCard
          icon={Clock}
          label="Duration"
          value={`${Math.round((script.metadata?.total_duration_ms || 30000) / 1000)}s`}
        />
        <DetailCard
          icon={Layers}
          label="Scenes"
          value={script.scenes?.length || 0}
        />
        <DetailCard
          icon={Zap}
          label="FPS"
          value={script.metadata?.fps || 60}
        />
        <DetailCard
          icon={Code2}
          label="Resolution"
          value={script.metadata?.resolution || '1080p'}
        />
      </div>

      {/* Color palette */}
      {script.color_palette && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Color Palette
          </h4>
          <div className="flex gap-2">
            {Object.entries(script.color_palette).map(([name, color]) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-lg border border-white/20"
                  style={{ backgroundColor: color as string }}
                />
                <span className="text-[10px] text-muted-foreground capitalize">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scenes list */}
      {script.scenes && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Scene Breakdown
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {script.scenes.map((scene: any, index: number) => (
              <motion.div
                key={index}
                className="glass rounded-lg p-3 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground capitalize">
                    {scene.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-primary font-mono">
                    {(scene.duration_ms / 1000).toFixed(1)}s
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {scene.animation_config?.particles && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                      Particles
                    </span>
                  )}
                  {scene.animation_config?.glowEffect && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                      Glow
                    </span>
                  )}
                  {scene.visual_effects?.scanlines && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-glow-purple/20 text-glow-purple">
                      Scanlines
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Particle system info */}
      {script.particle_system?.enabled && (
        <div className="glass rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Particle System
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="block text-primary font-mono">{script.particle_system.count}</span>
              Particles
            </div>
            <div>
              <span className="block text-primary font-mono">{script.particle_system.speed}x</span>
              Speed
            </div>
            <div>
              <span className="block text-primary font-mono capitalize">{script.particle_system.behavior}</span>
              Behavior
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const DetailCard = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: any; 
  label: string; 
  value: string | number; 
}) => (
  <div className="glass rounded-lg p-3">
    <div className="flex items-center gap-2 text-muted-foreground mb-1">
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </div>
    <div className="text-lg font-bold text-foreground">{value}</div>
  </div>
);
