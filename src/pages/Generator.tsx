import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdvancedPromptInput } from '@/components/AdvancedPromptInput';
import { VideoPreview } from '@/components/VideoPreview';
import { ScriptDetails } from '@/components/ScriptDetails';
import { GlowOrb } from '@/components/GlowOrb';
import { CodeRain } from '@/components/CodeRain';
import { useNavigate } from 'react-router-dom';

const GeneratorPage = () => {
  const navigate = useNavigate();
  const [generatedScript, setGeneratedScript] = useState<any>(null);
  const [projectId, setProjectId] = useState<string>('');

  const handleGenerate = (id: string, script: any) => {
    setProjectId(id);
    setGeneratedScript(script);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <CodeRain />
      <GlowOrb color="cyan" size="lg" className="-top-32 -right-32" />
      <GlowOrb color="magenta" size="md" className="bottom-1/4 -left-32" delay={2} />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-gradient">VibeGen Studio</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Prompt section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Generate Your <span className="text-gradient">Vibe Video</span>
            </h1>
            <p className="text-muted-foreground">
              Describe what you want to create and let AI do the magic
            </p>
          </div>
          
          <AdvancedPromptInput onGenerate={handleGenerate} />
        </motion.section>

        {/* Preview section */}
        {generatedScript && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video preview */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Video Preview
                </h2>
                <VideoPreview script={generatedScript} projectId={projectId} />
              </div>

              {/* Script details */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Script Analysis</h2>
                <ScriptDetails script={generatedScript} />
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default GeneratorPage;
