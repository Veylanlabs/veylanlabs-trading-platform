export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          tradingview_username: string | null
          telegram_username: string | null
          telegram_user_id: number | null
          tradingview_access_granted: boolean | null
          subscription_status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          tradingview_username?: string | null
          telegram_username?: string | null
          telegram_user_id?: number | null
          tradingview_access_granted?: boolean | null
          subscription_status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          tradingview_username?: string | null
          telegram_username?: string | null
          telegram_user_id?: number | null
          tradingview_access_granted?: boolean | null
          subscription_status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
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
