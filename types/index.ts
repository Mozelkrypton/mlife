export type Year = {
  id: string;
  user_id: string;
  year: number;
  title: string | null;
  reflection: string | null;
  cover_image_url: string | null;
  created_at: string;
};

export type Memory = {
  id: string;
  user_id: string;
  year_id: string;
  title: string;
  note: string | null;
  photo_url: string | null;
  location: string | null;
  memory_date: string | null;
  created_at: string;
};