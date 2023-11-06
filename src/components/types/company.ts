export type CompanyType = {
  id: number;
  name: string;
  email: string;
  logo: string;
  website: string;
};

export type CompaniesType = {
  data: CompanyType[];
  per_page: number;
  total: number;
  current_page: number;
};

export type SaveCompanyFormType = {
  _method: boolean;
  id: number;
  name: string;
  email: string;
  logo: string;
  website: string;
};
