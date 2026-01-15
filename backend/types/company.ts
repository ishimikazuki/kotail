export interface Industry {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  prefecture: string | null;
  url: string | null;
  employee_count: string | null;
  established: string | null;
  capital: string | null;
  business: string | null;
  industries: Industry[];
  hero_image_url: string | null;
  tagline: string | null;
  overall_summary: string | null;
  pros: string[];
  cons: string[];
  created_at: string;
  updated_at: string;
}

export interface CompanyInfo {
  label: string;
  value: string;
}

export interface AISummaryData {
  overall_summary: string;
  pros: string[];
  cons: string[];
}
