import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ========================
// ADVANCED VIDEO GENERATION ALGORITHMS
// ========================

interface AlgorithmSettings {
  codeStyle: string;
  animationSpeed: number;
  particleDensity: "low" | "medium" | "high";
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

interface VideoScene {
  type: string;
  duration_ms: number;
  code_content?: string;
  animation_config: {
    typeSpeed: number;
    cursorStyle: string;
    highlightLines: number[];
    focusArea: { x: number; y: number; width: number; height: number } | null;
    cameraZoom: number;
    particles: boolean;
    glowEffect: boolean;
    easing: string;
    delay: number;
  };
  visual_effects: {
    blur: number;
    saturation: number;
    contrast: number;
    noise: number;
    chromatic_aberration: number;
    scanlines: boolean;
    vignette: number;
  };
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
  audio: {
    background_music: string;
    typing_sounds: boolean;
    ambient_effects: string[];
  };
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
    size_range: [number, number];
    colors: string[];
    behavior: string;
  };
}

// Advanced prompt engineering for video script generation
const buildSystemPrompt = (style: string, settings: AlgorithmSettings): string => {
  return `You are an advanced AI video script generator specializing in creating viral "vibe coding" videos. You generate highly detailed, frame-by-frame video scripts optimized for social media engagement.

## YOUR EXPERTISE:
- Creating visually stunning code animations
- Designing particle effects and glow systems
- Timing code reveals for maximum impact
- Building tension and visual interest
- Optimizing for different platforms (TikTok, YouTube Shorts, Instagram Reels)

## STYLE GUIDE FOR "${style.toUpperCase()}":
${getStyleGuide(style)}

## ALGORITHM SETTINGS:
- Code Style: ${settings.codeStyle}
- Animation Speed: ${settings.animationSpeed}x
- Particle Density: ${settings.particleDensity}
- Glow Intensity: ${settings.glowIntensity}
- Syntax Theme: ${settings.syntaxTheme}
- Camera Movement: ${settings.cameraMovement}
- Transition Type: ${settings.transitionType}
- Resolution: ${settings.resolution}
- FPS: ${settings.fps}
- Duration: ${settings.duration} seconds
- Background: ${settings.backgroundType}

## OUTPUT FORMAT:
Generate a complete JSON video script with:
1. Metadata (title, description, timing)
2. Detailed scenes array with:
   - Scene type and timing
   - Code content (if applicable)
   - Animation configuration
   - Visual effects settings
3. Audio configuration
4. Color palette
5. Particle system settings

IMPORTANT: 
- Make the code visually interesting and educational
- Use dramatic reveals and typing animations
- Include particle effects at key moments
- Design for viral potential
- Ensure smooth transitions between scenes`;
};

const getStyleGuide = (style: string): string => {
  const guides: Record<string, string> = {
    matrix: `
- Use classic green-on-black color scheme (#00FF41 on #0D0208)
- Implement falling code rain effect in background
- Monospace font with slight glow
- Glitch effects on transitions
- Terminal-style cursor (block, blinking)
- Scan lines overlay for authenticity
- Characters should appear to "fall" into place`,
    
    neon: `
- Vibrant cyan (#00FFFF) and magenta (#FF00FF) as primary colors
- Strong glow effects with bloom
- Dark purple/black backgrounds (#0a0a0f)
- Smooth, flowing animations
- Gradient accents
- Soft particle trails
- Glass-morphism elements for UI overlays`,
    
    cyberpunk: `
- Hot pink (#FF0080), electric blue (#00D4FF), yellow (#FFE600)
- Glitch effects and chromatic aberration
- Cityscape or circuit board backgrounds
- Angular, aggressive transitions
- Holographic overlays
- Data corruption effects
- Japanese/Chinese characters as decorative elements`,
    
    minimal: `
- Clean white/light gray backgrounds
- Subtle shadows and depth
- Monochrome code with single accent color
- Smooth, understated animations
- Focus on typography and spacing
- No particles, minimal effects
- Professional, refined aesthetic`,
  };
  
  return guides[style] || guides.neon;
};

// Advanced code generation based on prompt
const generateCodeForPrompt = (prompt: string, language: string): string[] => {
  // This would be enhanced by AI but here are templates
  const codeTemplates: Record<string, string[]> = {
    typescript: [
      `// ${prompt}
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  timestamp: Date;
}`,
      `async function fetchData<T>(
  endpoint: string
): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint);
  return response.json();
}`,
      `const result = await fetchData<User[]>(
  '/api/users'
);
console.log(result.data);`,
    ],
    react: [
      `// ${prompt}
import { useState, useEffect } from 'react';`,
      `export const Component = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    loadData();
  }, []);`,
      `  return (
    <div className="container">
      {data && <DataView data={data} />}
    </div>
  );
};`,
    ],
    python: [
      `# ${prompt}
from typing import List, Dict
import asyncio`,
      `async def process_data(
    items: List[Dict]
) -> Dict:
    results = await asyncio.gather(*[
        handle_item(item) 
        for item in items
    ])
    return {"processed": results}`,
      `if __name__ == "__main__":
    data = load_data()
    result = asyncio.run(
        process_data(data)
    )
    print(result)`,
    ],
  };
  
  return codeTemplates[language] || codeTemplates.typescript;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();
  
  try {
    const { prompt, style, settings, projectId } = await req.json();
    
    console.log(`[VideoGen] Starting generation for project ${projectId}`);
    console.log(`[VideoGen] Prompt: ${prompt}`);
    console.log(`[VideoGen] Style: ${style}`);
    console.log(`[VideoGen] Settings:`, settings);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Log generation start
    const { data: generationLog } = await supabase
      .from("video_generations")
      .insert({
        project_id: projectId,
        model_used: "google/gemini-3-flash-preview",
        status: "processing",
      })
      .select()
      .single();

    console.log(`[VideoGen] Created generation log: ${generationLog?.id}`);

    // Build the AI prompt
    const systemPrompt = buildSystemPrompt(style, settings as AlgorithmSettings);
    
    const userPrompt = `Create a ${settings.duration || 30}-second viral vibe coding video script for:

"${prompt}"

The video should:
1. Start with an attention-grabbing intro (first 2-3 seconds are critical)
2. Show code being written/revealed with perfect timing
3. Include ${settings.particleDensity || 'medium'} particle density effects
4. Use ${settings.cameraMovement || 'smooth'} camera movements
5. Build to a satisfying conclusion
6. Be optimized for TikTok/Reels vertical format

Generate the complete JSON video script now.`;

    console.log(`[VideoGen] Calling AI Gateway...`);

    // Call Lovable AI Gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 4000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error(`[VideoGen] AI Gateway error: ${aiResponse.status} - ${errorText}`);
      
      if (aiResponse.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (aiResponse.status === 402) {
        throw new Error("AI credits exhausted. Please add more credits.");
      }
      throw new Error(`AI generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices?.[0]?.message?.content;
    
    console.log(`[VideoGen] AI Response received, length: ${generatedContent?.length}`);

    // Parse the generated script
    let videoScript: VideoScript;
    try {
      // Extract JSON from the response (it might be wrapped in markdown)
      const jsonMatch = generatedContent.match(/```json\n?([\s\S]*?)\n?```/) || 
                        generatedContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : generatedContent;
      videoScript = JSON.parse(jsonStr);
    } catch (parseError) {
      console.log(`[VideoGen] JSON parse failed, generating fallback script`);
      // Generate a fallback script based on the prompt
      videoScript = generateFallbackScript(prompt, style, settings as AlgorithmSettings);
    }

    // Generate code content for scenes
    const codeSnippets = generateCodeForPrompt(prompt, settings.codeStyle || 'typescript');
    
    // Enhance scenes with code content
    if (videoScript.scenes) {
      let codeIndex = 0;
      videoScript.scenes = videoScript.scenes.map((scene: VideoScene) => {
        if (scene.type === 'code_typing' || scene.type === 'code_reveal') {
          scene.code_content = codeSnippets[codeIndex % codeSnippets.length];
          codeIndex++;
        }
        return scene;
      });
    }

    // Update project with generated script
    const { error: updateError } = await supabase
      .from("video_projects")
      .update({
        generated_script: videoScript,
        status: "completed",
      })
      .eq("id", projectId);

    if (updateError) {
      console.error(`[VideoGen] Failed to update project: ${updateError.message}`);
    }

    // Create scene records
    if (videoScript.scenes && videoScript.scenes.length > 0) {
      const sceneRecords = videoScript.scenes.map((scene: VideoScene, index: number) => ({
        project_id: projectId,
        scene_order: index,
        scene_type: mapSceneType(scene.type),
        code_content: scene.code_content || null,
        animation_config: scene.animation_config || {},
        duration_ms: scene.duration_ms || 3000,
        start_time_ms: calculateStartTime(videoScript.scenes, index),
      }));

      const { error: scenesError } = await supabase
        .from("video_scenes")
        .insert(sceneRecords);

      if (scenesError) {
        console.error(`[VideoGen] Failed to create scenes: ${scenesError.message}`);
      }
    }

    // Update generation log
    const processingTime = Date.now() - startTime;
    await supabase
      .from("video_generations")
      .update({
        status: "completed",
        processing_time_ms: processingTime,
        prompt_tokens: aiData.usage?.prompt_tokens,
        completion_tokens: aiData.usage?.completion_tokens,
      })
      .eq("id", generationLog?.id);

    console.log(`[VideoGen] Generation completed in ${processingTime}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        script: videoScript,
        processingTime,
        projectId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[VideoGen] Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Helper functions
function mapSceneType(type: string): string {
  const validTypes = ['intro', 'code_typing', 'code_reveal', 'transition', 'highlight', 'zoom', 'outro'];
  return validTypes.includes(type) ? type : 'code_typing';
}

function calculateStartTime(scenes: VideoScene[], index: number): number {
  let time = 0;
  for (let i = 0; i < index; i++) {
    time += scenes[i].duration_ms || 3000;
  }
  return time;
}

function generateFallbackScript(prompt: string, style: string, settings: AlgorithmSettings): VideoScript {
  const colorPalettes: Record<string, any> = {
    matrix: {
      primary: "#00FF41",
      secondary: "#008F11",
      accent: "#00FF41",
      background: "#0D0208",
      text: "#00FF41",
      glow: "#00FF41",
    },
    neon: {
      primary: "#00FFFF",
      secondary: "#FF00FF",
      accent: "#00FF88",
      background: "#0a0a0f",
      text: "#FFFFFF",
      glow: "#00FFFF",
    },
    cyberpunk: {
      primary: "#FF0080",
      secondary: "#00D4FF",
      accent: "#FFE600",
      background: "#0a0a0f",
      text: "#FFFFFF",
      glow: "#FF0080",
    },
    minimal: {
      primary: "#333333",
      secondary: "#666666",
      accent: "#0066FF",
      background: "#FAFAFA",
      text: "#1a1a1a",
      glow: "#0066FF",
    },
  };

  const duration = settings.duration || 30;
  
  return {
    metadata: {
      title: prompt,
      description: `A ${style} style vibe coding video`,
      total_duration_ms: duration * 1000,
      resolution: settings.resolution || "1080p",
      fps: settings.fps || 60,
      aspect_ratio: "9:16",
    },
    scenes: [
      {
        type: "intro",
        duration_ms: 2000,
        animation_config: {
          typeSpeed: 0,
          cursorStyle: "block",
          highlightLines: [],
          focusArea: null,
          cameraZoom: 1.2,
          particles: true,
          glowEffect: true,
          easing: "easeOutCubic",
          delay: 0,
        },
        visual_effects: {
          blur: 0,
          saturation: 1.2,
          contrast: 1.1,
          noise: 0.02,
          chromatic_aberration: style === "cyberpunk" ? 0.003 : 0,
          scanlines: style === "matrix",
          vignette: 0.3,
        },
      },
      {
        type: "code_typing",
        duration_ms: Math.floor((duration - 6) * 1000 * 0.4),
        animation_config: {
          typeSpeed: 50 * settings.animationSpeed,
          cursorStyle: "block",
          highlightLines: [],
          focusArea: null,
          cameraZoom: 1.0,
          particles: settings.particleDensity !== "low",
          glowEffect: settings.glowIntensity > 0.5,
          easing: "linear",
          delay: 0,
        },
        visual_effects: {
          blur: 0,
          saturation: 1.0,
          contrast: 1.0,
          noise: 0.01,
          chromatic_aberration: 0,
          scanlines: style === "matrix",
          vignette: 0.2,
        },
      },
      {
        type: "code_reveal",
        duration_ms: Math.floor((duration - 6) * 1000 * 0.4),
        animation_config: {
          typeSpeed: 80 * settings.animationSpeed,
          cursorStyle: "line",
          highlightLines: [1, 2, 3],
          focusArea: null,
          cameraZoom: 1.1,
          particles: true,
          glowEffect: true,
          easing: "easeInOutQuad",
          delay: 200,
        },
        visual_effects: {
          blur: 0,
          saturation: 1.1,
          contrast: 1.05,
          noise: 0.015,
          chromatic_aberration: style === "cyberpunk" ? 0.002 : 0,
          scanlines: style === "matrix",
          vignette: 0.25,
        },
      },
      {
        type: "highlight",
        duration_ms: Math.floor((duration - 6) * 1000 * 0.2),
        animation_config: {
          typeSpeed: 0,
          cursorStyle: "none",
          highlightLines: [2, 3, 4],
          focusArea: { x: 0, y: 100, width: 400, height: 200 },
          cameraZoom: 1.3,
          particles: true,
          glowEffect: true,
          easing: "easeOutQuint",
          delay: 0,
        },
        visual_effects: {
          blur: 0,
          saturation: 1.3,
          contrast: 1.15,
          noise: 0.02,
          chromatic_aberration: style === "cyberpunk" ? 0.004 : 0,
          scanlines: style === "matrix",
          vignette: 0.35,
        },
      },
      {
        type: "outro",
        duration_ms: 2000,
        animation_config: {
          typeSpeed: 0,
          cursorStyle: "none",
          highlightLines: [],
          focusArea: null,
          cameraZoom: 0.9,
          particles: true,
          glowEffect: true,
          easing: "easeInCubic",
          delay: 0,
        },
        visual_effects: {
          blur: 2,
          saturation: 0.8,
          contrast: 0.9,
          noise: 0.03,
          chromatic_aberration: 0,
          scanlines: false,
          vignette: 0.5,
        },
      },
    ],
    audio: {
      background_music: style === "minimal" ? "ambient_soft" : "synthwave_loop",
      typing_sounds: true,
      ambient_effects: style === "matrix" ? ["digital_rain", "terminal_beep"] : ["particle_whoosh"],
    },
    color_palette: colorPalettes[style] || colorPalettes.neon,
    particle_system: {
      enabled: settings.particleDensity !== "low",
      count: settings.particleDensity === "high" ? 200 : settings.particleDensity === "medium" ? 100 : 30,
      speed: settings.animationSpeed,
      size_range: [1, 4],
      colors: [colorPalettes[style]?.primary || "#00FFFF", colorPalettes[style]?.secondary || "#FF00FF"],
      behavior: style === "matrix" ? "rain" : "float",
    },
  };
}
