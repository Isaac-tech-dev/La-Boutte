// Types for the Supabase database, matching supabase/migrations/*_init_schema.sql.
// Once your project is linked you can regenerate this file instead of editing it:
//   npx supabase gen types typescript --linked > src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string;
          last_name?: string;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
        };
        Relationships: [];
      };
      pizzas: {
        Row: {
          id: string;
          external_id: string | null;
          name: string;
          description: string;
          price: number;
          image_url: string | null;
          is_veg: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_id?: string | null;
          name: string;
          description?: string;
          price: number;
          image_url?: string | null;
          is_veg?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          external_id?: string | null;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string | null;
          is_veg?: boolean | null;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          pizza_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          pizza_id: string;
          quantity: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_pizza_id_fkey";
            columns: ["pizza_id"];
            isOneToOne: false;
            referencedRelation: "pizzas";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      adjust_cart_item: {
        Args: { p_pizza_id: string; p_delta?: number };
        Returns: number;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
