import { supabase } from '@backend/lib/supabase';
import { Company, Industry } from '@backend/types/company';

type CompanyRecord = Omit<Company, 'industries'> & {
  company_industries?: { industries: Industry | null }[] | null;
};

const normalizeCompany = (record: CompanyRecord): Company => {
  const { company_industries, ...rest } = record;
  const industries =
    company_industries
      ?.map((entry) => entry.industries)
      .filter((industry): industry is Industry => Boolean(industry)) ?? [];

  return {
    ...rest,
    industries,
  };
};

/**
 * Fetch a single company by ID
 */
export async function getCompanyById(companyId: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from('companies')
    .select('*, company_industries(industries(id,name))')
    .eq('id', companyId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(error.message);
  }

  return normalizeCompany(data as CompanyRecord);
}

/**
 * Fetch all companies (for company list page)
 */
export async function getAllCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('*, company_industries(industries(id,name))')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data as CompanyRecord[]).map(normalizeCompany);
}
