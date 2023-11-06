import { useSetRecoilState, useRecoilValue } from "recoil";

import { useFetchWrapper } from "utils/index";
import {
  companiesAtom,
  companyAtom,
  companyListAtom,
  saveCompanyAtom,
} from "state/index";
import { CompanyType, SaveCompanyFormType } from "components/types/company";

export { useCompanyActions };

function useCompanyActions() {
  const baseUrl = `${import.meta.env.VITE_API_URL}/api/company`;
  const fetchWrapper = useFetchWrapper();
  const setCompanies = useSetRecoilState(companiesAtom);
  const setCompaniesList = useSetRecoilState(companyListAtom);
  const setSavingCompany = useSetRecoilState(saveCompanyAtom);
  const companies = useRecoilValue(companiesAtom);
  const setCompany = useSetRecoilState(companyAtom);
  const company = useRecoilValue(companyAtom);

  return {
    create: create,
    delete: _delete,
    getAll,
    getList,
    update,
    updateLogo,
  };

  function getAll(page: number = 1) {
    return fetchWrapper.get(`${baseUrl}?page=${page}`).then(setCompanies);
  }
  function getList() {
    return fetchWrapper
      .get(`${import.meta.env.VITE_API_URL}/api/list`)
      .then(setCompaniesList);
  }
  function create(params: CompanyType, logo = null) {
    setSavingCompany(true);
    return fetchWrapper.post(baseUrl, params).then((x) => {
      //if there less than 10 items, it means we are on the last page, and we need to display this.
      if (companies.data.length < 10) {
        setCompanies({ ...companies, data: [...companies.data, x] });
      }
      updateLogo(x.id, logo);
      setSavingCompany(false);
    });
  }
  function update(id: number, params: Partial<SaveCompanyFormType>) {
    return fetchWrapper
      .put(`${import.meta.env.VITE_API_URL}/${id}`, params)
      .then((x) => {
        const companiesData = companies.data.map((c) => (c.id === id ? x : c));
        setCompanies({ ...companies, data: companiesData });
      });
  }

  function updateLogo(
    id: number,
    params: Partial<Pick<CompanyType, "logo">> | null
  ) {
    return fetchWrapper
      .putMutlipart(`${import.meta.env.VITE_API_URL}/api/logo/${id}`, params)
      .then((x) => {
        const companiesData = companies.data.map((c) =>
          c.id === id ? { ...c, logo: x.path } : c
        );
        setCompanies({ ...companies, data: companiesData });
        setCompany({ ...company, logo: x.path });
      });
  }
  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id: number) {
    return fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      const companiesData = companies.data.filter((c) => c.id !== id);
      setCompanies({ ...companies, data: companiesData });
    });
  }
}
