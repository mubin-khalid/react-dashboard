import { CompanyType } from "./company";

export type EmployeeType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: CompanyType;
};

export type EmployeesType = {
  data: EmployeeType[];
  per_page: number;
  total: number;
  current_page: number;
};

export type SaveEmployeeFormType = {
  _method: boolean;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: number | CompanyType;
};
