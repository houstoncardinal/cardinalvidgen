export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      video_generations: {
        Row: {
          completion_tokens: number | null
          created_at: string
          error_message: string | null
          id: string
          model_used: string
          processing_time_ms: number | null
          project_id: string | null
          prompt_tokens: number | null
          status: string
        }
        Insert: {
          completion_tokens?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          model_used?: string
          processing_time_ms?: number | null
          project_id?: string | null
          prompt_tokens?: number | null
          status?: string
        }
        Update: {
          completion_tokens?: number | null
          created_at?: string
          error_message?: string | null
          id?: string
          model_used?: string
          processing_time_ms?: number | null
          project_id?: string | null
          prompt_tokens?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_generations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      video_projects: {
        Row: {
          algorithm_settings: Json
          created_at: string
          duration_seconds: number | null
          generated_script: Json | null
          id: string
          likes_count: number | null
          prompt: string
          resolution: string | null
          status: string
          style: string
          thumbnail_url: string | null
          updated_at: string
          user_id: string | null
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          algorithm_settings?: Json
          created_at?: string
          duration_seconds?: number | null
          generated_script?: Json | null
          id?: string
          likes_count?: number | null
          prompt: string
          resolution?: string | null
          status?: string
          style?: string
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          algorithm_settings?: Json
          created_at?: string
          duration_seconds?: number | null
          generated_script?: Json | null
          id?: string
          likes_count?: number | null
          prompt?: string
          resolution?: string | null
          status?: string
          style?: string
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      video_scenes: {
        Row: {
          animation_config: Json
          code_content: string | null
          created_at: string
          duration_ms: number
          id: string
          language: string | null
          project_id: string
          scene_order: number
          scene_type: string
          start_time_ms: number
        }
        Insert: {
          animation_config?: Json
          code_content?: string | null
          created_at?: string
          duration_ms?: number
          id?: string
          language?: string | null
          project_id: string
          scene_order: number
          scene_type: string
          start_time_ms?: number
        }
        Update: {
          animation_config?: Json
          code_content?: string | null
          created_at?: string
          duration_ms?: number
          id?: string
          language?: string | null
          project_id?: string
          scene_order?: number
          scene_type?: string
          start_time_ms?: number
        }
        Relationships: [
          {
            foreignKeyName: "video_scenes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "video_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      video_templates: {
        Row: {
          created_at: string
          default_settings: Json
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          preview_url: string | null
          scene_templates: Json
          style: string
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          default_settings?: Json
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          preview_url?: string | null
          scene_templates?: Json
          style: string
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          default_settings?: Json
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          preview_url?: string | null
          scene_templates?: Json
          style?: string
          usage_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
