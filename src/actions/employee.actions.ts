import { useSetRecoilState, useRecoilValue } from "recoil";

import { useFetchWrapper } from "utils/index";
import { employeesAtom } from "state/index";
import { EmployeeType, SaveEmployeeFormType } from "components/types/employee";

export { useEmployeeActions };

function useEmployeeActions() {
  const baseUrl = `${import.meta.env.VITE_API_URL}/api/employee`;
  const fetchWrapper = useFetchWrapper();
  const setEmployees = useSetRecoilState(employeesAtom);
  const employees = useRecoilValue(employeesAtom);

  return {
    getAll,
    update,
    delete: _delete,
    create: create,
  };

  function getAll(page: number = 1) {
    return fetchWrapper.get(`${baseUrl}?page=${page}`).then(setEmployees);
  }

  function create(params: EmployeeType) {
    return fetchWrapper.post(baseUrl, params).then((x) => {
      //if there less than 10 items, it means we are on the last page, and we need to display this.
      if (employees.data.length < 10) {
        setEmployees({ ...employees, data: [...employees.data, x] });
      }
    });
  }
  function update(id: number, params: Partial<SaveEmployeeFormType>) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
      const employeesData = employees.data.map((c) => (c.id === id ? x : c));
      setEmployees({ ...employees, data: employeesData });
    });
  }

  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id: number) {
    return fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      const employeesData = employees.data.filter((c) => c.id !== id);
      setEmployees({ ...employees, data: employeesData });
    });
  }
}
