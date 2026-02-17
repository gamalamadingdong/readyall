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
      user_profiles: {
        Row: {
          user_id: string;
          display_name: string;
          email: string | null;
          roles: string[] | null;
          preferences: Json | null;
          updated_at: string | null;
        };
        Insert: {
          user_id: string;
          display_name: string;
          email?: string | null;
          roles?: string[] | null;
          preferences?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          display_name?: string;
          email?: string | null;
          roles?: string[] | null;
          preferences?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      community_items: {
        Row: {
          id: string;
          user_id: string;
          product_area: string;
          item_type: string;
          title: string;
          details: string;
          status: string;
          moderation_note: string | null;
          moderated_by: string | null;
          moderated_at: string | null;
          github_issue_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_area?: string;
          item_type: string;
          title: string;
          details: string;
          status?: string;
          moderation_note?: string | null;
          moderated_by?: string | null;
          moderated_at?: string | null;
          github_issue_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_area?: string;
          item_type?: string;
          title?: string;
          details?: string;
          status?: string;
          moderation_note?: string | null;
          moderated_by?: string | null;
          moderated_at?: string | null;
          github_issue_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      community_votes: {
        Row: {
          id: string;
          community_item_id: string;
          user_id: string;
          vote: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          community_item_id: string;
          user_id: string;
          vote?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          community_item_id?: string;
          user_id?: string;
          vote?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_votes_community_item_id_fkey";
            columns: ["community_item_id"];
            isOneToOne: false;
            referencedRelation: "community_items";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      user_has_role: {
        Args: { required_role: string };
        Returns: boolean;
      };
      create_sso_handoff: {
        Args: {
          p_source_app: string;
          p_target_app: string;
          p_return_to?: string | null;
          p_ttl_seconds?: number;
        };
        Returns: string;
      };
      consume_sso_handoff: {
        Args: {
          p_token: string;
          p_expected_target: string;
          p_consumer_user_id?: string | null;
        };
        Returns: {
          initiator_user_id: string;
          source_app: string;
          target_app: string;
          requested_return_to: string | null;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
