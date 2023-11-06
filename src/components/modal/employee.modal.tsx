// @ts-nocheck
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmployeeActions } from "actions/employee.actions";
import { useRecoilState, useRecoilValue } from "recoil";
import { EmployeeType, SaveEmployeeFormType } from "components/types/employee";
import { employeeAtom } from "state/employee";
import { companyListAtom } from "state/company";

type EmployeePropType = {
  show: boolean;
  setShow: (arg0: boolean) => void;
};

const EmployeeModal: FC<EmployeePropType> = ({ show, setShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaveEmployeeFormType>();
  const [employee, setEmployee] = useRecoilState<EmployeeType>(employeeAtom);
  const employeeAction = useEmployeeActions();

  const [firstName, setFirstName] = useState(employee?.first_name || "");
  const [lastName, setLastName] = useState(employee?.last_name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const companiesList = useRecoilValue(companyListAtom);
  const [company, setCompany] = useState(employee?.company?.id);
  const onSubmit = async (data: SaveEmployeeFormType) => {
    if (employee.id) {
      // Edit Mode
      delete data["_method"];
      employeeAction.update(employee.id, data);
    } else {
      //Create Mode
      Object.keys(data).map((key: string) => {
        if (data[key].trim() === "") {
          delete data[key];
        }
      });

      await employeeAction.create(data);
    }
    setShow(false);
    resetState();
  };

  const resetState = () => {
    setEmployee({} as EmployeeType);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
  };

  return (
    show && (
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
        key={employee.id}
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="font-medium text-gray-800">First Name</label>
                {employee.id && (
                  <input type="hidden" {...register("_method")} value="PUT" />
                )}
                <input
                  type="text"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  {...register("first_name", {
                    required: "Please input a first name",
                  })}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <label className="font-medium text-gray-800">Last Name</label>
                <input
                  type="text"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  {...register("last_name", {
                    required: "Please input a first name",
                  })}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <label className="font-medium text-gray-800">Email</label>
                <input
                  type="text"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email && errors.email.message) {
                      errors.email.message = "";
                    }
                  }}
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  value={email}
                />
                {errors.email && (
                  <div className="text-red-600 p4">{errors.email.message}</div>
                )}
                <label className="font-medium text-gray-800">Phone #</label>
                <input
                  type="text"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  {...register("phone")}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <label className="font-medium text-gray-800">Company</label>
                <select
                  {...register("company", { required: true })}
                  id=""
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  {companiesList?.map((c) => (
                    <option key={c?.id} value={c?.id}>
                      {c?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => {
                    resetState();
                    setShow(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-purple-700 hover:bg-purple-900 text-green-100 font-bold rounded"
                >
                  {employee.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default EmployeeModal;
