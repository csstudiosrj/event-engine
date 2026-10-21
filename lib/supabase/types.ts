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
          plan_expires_at: string | null
          pagarme_customer_id: string | null
          pagarme_subscription_id: string | null
          subscription_provider: string | null
          subscription_id: string | null
          accepted_terms_at: string | null
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
          plan_expires_at?: string | null
          pagarme_customer_id?: string | null
          pagarme_subscription_id?: string | null
          subscription_provider?: string | null
          subscription_id?: string | null
          accepted_terms_at?: string | null
          updated_at?: string
        }
        Relationships: []
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
        Relationships: []
      }
      calc_results: {
        Row: {
          id: string
          event_id: string | null
          user_id: string
          calc_name: string
          inputs: Json | null
          result_json: Json
          memorial_data: string | null
          is_compliant: boolean | null
          credits_used: number
          version: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          user_id: string
          calc_name: string
          inputs?: Json | null
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
        Relationships: []
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
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          user_id: string
          product: string
          amount_cents: number
          status: 'pending' | 'paid' | 'canceled'
          pagarme_link_id: string | null
          pagarme_order_id: string | null
          pagarme_subscription_id: string | null
          provider: string
          external_id: string | null
          created_at: string
          paid_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          product: string
          amount_cents: number
          status?: 'pending' | 'paid' | 'canceled'
          pagarme_link_id?: string | null
          pagarme_order_id?: string | null
          pagarme_subscription_id?: string | null
          provider?: string
          external_id?: string | null
          paid_at?: string | null
        }
        Update: {
          status?: 'pending' | 'paid' | 'canceled'
          pagarme_link_id?: string | null
          pagarme_order_id?: string | null
          pagarme_subscription_id?: string | null
          external_id?: string | null
          paid_at?: string | null
        }
        Relationships: []
      }
      webhook_events: {
        Row: { id: string; type: string; received_at: string }
        Insert: { id: string; type: string }
        Update: never
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      spend_credit: {
        Args: { p_user_id: string; p_amount: number }
        Returns: number
      }
      grant_credits: {
        Args: { p_user_id: string; p_amount: number; p_type: string; p_description: string }
        Returns: number
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Helpers de tipo
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type CalcResult = Database['public']['Tables']['calc_results']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type CreditTransaction = Database['public']['Tables']['credit_transactions']['Row']
