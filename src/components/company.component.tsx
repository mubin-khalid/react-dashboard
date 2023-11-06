import { useCompanyActions } from "actions/company.actions";
import { companiesAtom, companyAtom } from "state/company";
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import React from "react";
import { LiaTrashAlt, LiaPencilAltSolid } from "react-icons/lia";
import CompanyModal from "./modal/company.modal";
import Pagination from "./shared/pagination.component";
import { CompanyType } from "components/types/company";

type CompanyDataType = {
  id: number;
  name: string;
  email: string;
  logo: string;
  website: string;
};
const Company = () => {
  const companyActions = useCompanyActions();
  const companies = useRecoilValue(companiesAtom);
  const setCompany = useSetRecoilState(companyAtom);
  const [currentPage, setCurrentPage] = useState(companies.current_page || 1);

  const [show, setShow] = useState(false);
  useEffect(() => {
    companyActions.getAll(currentPage);
  }, [currentPage]);

  const editCompany = (data: CompanyDataType) => {
    setCompany(data);
    setShow(true);
  };

  const deleteCompany = (id: number) => {
    companyActions.delete(id);
  };

  // Change page
  const paginateFront = () => setCurrentPage(companies?.current_page + 1);
  const paginateBack = () => setCurrentPage(companies?.current_page - 1);
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="flex p-4 justify-end">
        <button
          className="py-3 px-8 bg-purple-700 text-green-100 font-bold rounded"
          onClick={() => {
            setCompany({} as CompanyType);
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
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Website
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {companies?.data?.map(
            ({ id, name, email, logo, website }: CompanyDataType) => (
              <React.Fragment key={id}>
                <tr className="hover:bg-gray-50" key={id}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      {logo && (
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={
                            logo.startsWith("http://") ||
                            logo.startsWith("https://")
                              ? logo
                              : `${import.meta.env.VITE_API_URL}/${logo}`
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <div className="text-sm flex items-center">
                      <div className="font-medium text-gray-700">{name}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{website}</td>
                  <td className="flex items-center justify-center text-2xl space-x-4">
                    <LiaPencilAltSolid
                      onClick={() =>
                        editCompany({ id, name, email, logo, website })
                      }
                      className="text-purple-600 cursor-pointer"
                    />
                    <LiaTrashAlt
                      onClick={() => deleteCompany(id)}
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
        currentPage={companies?.current_page}
        postsPerPage={10}
        totalPosts={companies?.total}
      />
      {show && <CompanyModal show={show} setShow={setShow} />}
    </div>
  );
};

export default Company;
