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
      solira_products: {
        Row: {
          id: number
          name: string
          price: number
          description: string | null
          category: string
          image: string
          created_at: string
          sizes?: string[] | null
          colors?: string[] | null
        }
        Insert: {
          id?: number
          name: string
          price: number
          description?: string | null
          category: string
          image: string
          created_at?: string
          sizes?: string[] | null
          colors?: string[] | null
        }
        Update: {
          id?: number
          name?: string
          price?: number
          description?: string | null
          category?: string
          image?: string
          created_at?: string
          sizes?: string[] | null
          colors?: string[] | null
        }
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
  }
}
