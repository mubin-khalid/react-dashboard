import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import React from "react";
import { useCompanyActions } from "actions/company.actions";

import { LiaTrashAlt, LiaPencilAltSolid } from "react-icons/lia";
import EmployeeModal from "./modal/employee.modal";
import Pagination from "./shared/pagination.component";
import { EmployeeType, SaveEmployeeFormType } from "components/types/employee";
import { useEmployeeActions } from "actions/employee.actions";
import { employeeAtom, employeesAtom } from "state/employee";

const Employee = () => {
  const employeeActions = useEmployeeActions();
  const companyActions = useCompanyActions();
  const employees = useRecoilValue(employeesAtom);
  const setEmployee = useSetRecoilState(employeeAtom);
  const [currentPage, setCurrentPage] = useState(employees.current_page || 1);

  const [show, setShow] = useState(false);
  useEffect(() => {
    employeeActions.getAll(currentPage);
  }, [currentPage]);

  useEffect(() => {
    companyActions.getList();
  }, []);

  const editEmployee = (data: SaveEmployeeFormType) => {
    console.log(data);
    setEmployee(data as unknown as EmployeeType);
    setShow(true);
  };

  const deleteEmployee = (id: number) => {
    employeeActions.delete(id);
  };

  // Change page
  const paginateFront = () => setCurrentPage(employees?.current_page + 1);
  const paginateBack = () => setCurrentPage(employees?.current_page - 1);
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="flex p-4 justify-end">
        <button
          className="py-3 px-8 bg-purple-700 text-green-100 font-bold rounded"
          onClick={() => {
            setEmployee({} as EmployeeType);
            setShow(true);
          }}
        >
          Add
        </button>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              First Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Last Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Phone
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Company
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {employees?.data?.map(
            ({
              id,
              first_name,
              last_name,
              email,
              phone,
              company,
            }: EmployeeType) => (
              <React.Fragment key={id}>
                <tr className="hover:bg-gray-50" key={id}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="text-sm flex items-center">
                      <div className="font-medium text-gray-700">
                        {first_name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{last_name}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{phone}</td>
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="flex items-center justify-center text-2xl space-x-4">
                    <LiaPencilAltSolid
                      onClick={() =>
                        editEmployee({
                          id,
                          first_name,
                          last_name,
                          email,
                          phone,
                          company,
                          _method: false,
                        })
                      }
                      className="text-purple-600 cursor-pointer"
                    />
                    <LiaTrashAlt
                      onClick={() => deleteEmployee(id)}
                      className="text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              </React.Fragment>
            )
          )}
        </tbody>
      </table>
      <Pagination
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={employees?.current_page}
        postsPerPage={10}
        totalPosts={employees?.total}
      />
      {show && <EmployeeModal show={show} setShow={setShow} />}
    </div>
  );
};

export default Employee;
