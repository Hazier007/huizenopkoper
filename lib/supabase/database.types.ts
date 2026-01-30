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
      provinces: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      cities: {
        Row: {
          id: string
          province_id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          province_id: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          province_id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          created_at: string
          status: string
          property_type: string
          address_street: string | null
          address_number: string | null
          postal_code: string
          city: string
          province: string
          living_area_m2: number | null
          plot_area_m2: number | null
          bedrooms: number | null
          condition: string
          occupancy: string
          timeline: string
          asking_price_hint: number | null
          description: string | null
          contact_name: string
          contact_email: string
          contact_phone: string
          gdpr_consent: boolean
          source_page: string | null
          photos: Json
        }
        Insert: {
          id?: string
          created_at?: string
          status?: string
          property_type: string
          address_street?: string | null
          address_number?: string | null
          postal_code: string
          city: string
          province: string
          living_area_m2?: number | null
          plot_area_m2?: number | null
          bedrooms?: number | null
          condition: string
          occupancy: string
          timeline: string
          asking_price_hint?: number | null
          description?: string | null
          contact_name: string
          contact_email: string
          contact_phone: string
          gdpr_consent?: boolean
          source_page?: string | null
          photos?: Json
        }
        Update: {
          id?: string
          created_at?: string
          status?: string
          property_type?: string
          address_street?: string | null
          address_number?: string | null
          postal_code?: string
          city?: string
          province?: string
          living_area_m2?: number | null
          plot_area_m2?: number | null
          bedrooms?: number | null
          condition?: string
          occupancy?: string
          timeline?: string
          asking_price_hint?: number | null
          description?: string | null
          contact_name?: string
          contact_email?: string
          contact_phone?: string
          gdpr_consent?: boolean
          source_page?: string | null
          photos?: Json
        }
      }
      buyers: {
        Row: {
          id: string
          created_at: string
          company_name: string
          contact_name: string
          email: string
          phone: string
          regions: Json
          property_types: Json
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          company_name: string
          contact_name: string
          email: string
          phone: string
          regions?: Json
          property_types?: Json
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          company_name?: string
          contact_name?: string
          email?: string
          phone?: string
          regions?: Json
          property_types?: Json
          is_active?: boolean
        }
      }
      lead_matches: {
        Row: {
          id: string
          lead_id: string
          buyer_id: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          lead_id: string
          buyer_id: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          lead_id?: string
          buyer_id?: string
          created_at?: string
          status?: string
        }
      }
      property_leads: {
        Row: {
          id: string
          contact_name: string
          email: string
          phone: string
          address: string
          city: string
          province: string
          postal_code: string
          property_type: string
          description: string | null
          asking_price: string | null
          photo_urls: Json
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contact_name: string
          email: string
          phone: string
          address: string
          city: string
          province: string
          postal_code: string
          property_type: string
          description?: string | null
          asking_price?: string | null
          photo_urls?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contact_name?: string
          email?: string
          phone?: string
          address?: string
          city?: string
          province?: string
          postal_code?: string
          property_type?: string
          description?: string | null
          asking_price?: string | null
          photo_urls?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
