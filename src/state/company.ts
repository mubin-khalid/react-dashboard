import { atom } from "recoil";
import { CompanyType, CompaniesType } from "components/types/company";

export const companiesAtom = atom<CompaniesType>({
  key: "companies",
  default: [] as unknown as CompaniesType,
});

export const companyAtom = atom<CompanyType>({
  key: "company",
  default: {} as CompanyType,
});

export const saveCompanyAtom = atom<boolean>({
  key: "savingCompany",
  default: false,
});

export const companyListAtom = atom<Pick<CompanyType, "name" & "id">>({
  key: "companiesList",
  default: [],
});
