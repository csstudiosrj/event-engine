// ─────────────────────────────────────────────────────────────
//  Event Engine — Database Types
//  Gerado manualmente conforme schema SQL do projeto.
//  Quando o Supabase CLI estiver configurado, substituir por:
//  npx supabase gen types typescript --project-id ubdstabzxjvggxybewum
// ─────────────────────────────────────────────────────────────

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          plan: 'free' | 'credits' | 'solo' | 'pro'
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          plan?: 'free' | 'credits' | 'solo' | 'pro'
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string | null
          plan?: 'free' | 'credits' | 'solo' | 'pro'
          credits?: number
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          city: string | null
          state: string
          date: string | null
          duration_h: number
          environment: 'Aberto' | 'Fechado' | 'Misto'
          pax: number
          m2: number | null
          exit_type: 'distintas' | 'unica'
          venue_type: string
          risk_level: 'alto' | 'medio' | 'baixo'
          status: 'active' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          city?: string | null
          state?: string
          date?: string | null
          duration_h?: number
          environment?: 'Aberto' | 'Fechado' | 'Misto'
          pax: number
          m2?: number | null
          exit_type?: 'distintas' | 'unica'
          venue_type?: string
          risk_level?: 'alto' | 'medio' | 'baixo'
          status?: 'active' | 'archived'
        }
        Update: {
          name?: string
          type?: string
          city?: string | null
          state?: string
          date?: string | null
          duration_h?: number
          environment?: 'Aberto' | 'Fechado' | 'Misto'
          pax?: number
          m2?: number | null
          exit_type?: 'distintas' | 'unica'
          venue_type?: string
          risk_level?: 'alto' | 'medio' | 'baixo'
          status?: 'active' | 'archived'
          updated_at?: string
        }
      }
      calc_results: {
        Row: {
          id: string
          event_id: string
          user_id: string
          calc_name: string
          result_json: Json
          memorial_data: string | null
          is_compliant: boolean | null
          credits_used: number
          version: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          calc_name: string
          result_json: Json
          memorial_data?: string | null
          is_compliant?: boolean | null
          credits_used?: number
          version?: string
        }
        Update: {
          result_json?: Json
          memorial_data?: string | null
          is_compliant?: boolean | null
        }
      }
      credit_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'purchase' | 'spend' | 'bonus'
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'purchase' | 'spend' | 'bonus'
          description: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Helpers de tipo
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type CalcResult = Database['public']['Tables']['calc_results']['Row']
export type CreditTransaction = Database['public']['Tables']['credit_transactions']['Row']
