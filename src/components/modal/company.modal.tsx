// @ts-nocheck
import ImageHandler from "components/shared/image-handler.component";
import { FC, useState } from "react";
import { companyAtom } from "state/company";
import { useForm } from "react-hook-form";
import { useCompanyActions } from "actions/company.actions";
import { useRecoilState } from "recoil";
import { LiaTrashAlt } from "react-icons/lia";
import { CompanyType, SaveCompanyFormType } from "components/types/company";

type CompanyPropType = {
  show: boolean;
  setShow: (arg0: boolean) => void;
};

const Company: FC<CompanyPropType> = ({ show, setShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaveCompanyFormType>();
  const [company, setCompany] = useRecoilState<CompanyType>(companyAtom);
  const companyActions = useCompanyActions();

  const [companyName, setCompanyName] = useState(company?.name || "");
  const [email, setEmail] = useState(company?.email || "");
  const [website, setWebsite] = useState(company?.website || "");
  const [newLogo, setNewLogo] = useState<Blob | null>(null);
  const updateImage = (file: Blob | null = null) => {
    const fd = new FormData();
    if (company.id) {
      if (file) {
        fd.append("logo", file);
        companyActions.updateLogo(company.id, fd as unknown as CompanyType);
      } else {
        companyActions.updateLogo(company.id, [] as unknown as CompanyType);
      }
    } else {
      if (file) {
        setNewLogo(file);
      }
    }
  };
  const onSubmit = async (data: SaveCompanyFormType) => {
    if (company.id) {
      // Edit Mode
      delete data["_method"];
      companyActions.update(company.id, data);
    } else {
      //Create Mode
      Object.keys(data).map((key: string) => {
        if (data[key].trim() === "") {
          delete data[key];
        }
      });
      if (newLogo !== "") {
        const fd = new FormData();
        fd.append("logo", newLogo);
        await companyActions.create(data, fd);
      } else {
        await companyActions.create(data);
      }
    }
    setShow(false);
    resetState();
  };

  const resetState = () => {
    setCompany({} as CompanyType);
    setCompanyName("");
    setEmail("");
    setWebsite("");
  };

  return (
    show && (
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
        key={company.id}
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
                <label className="font-medium text-gray-800">Name</label>
                {company.id && (
                  <input type="hidden" {...register("_method")} value="PUT" />
                )}
                <input
                  type="text"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  {...register("name", { required: "Please input a name" })}
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                />
                <label className="font-medium text-gray-800">email</label>
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
                <label className="font-medium text-gray-800">website</label>
                <input
                  type="text"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  {...register("website")}
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                />
                <div className="flex items-center space-x-6 mt-3">
                  <ImageHandler uploadFn={updateImage} />
                  {company.logo && (
                    <div className="flex">
                      <img
                        src={
                          company.logo.startsWith("http://") ||
                          company.logo.startsWith("https://")
                            ? company.logo
                            : `${import.meta.env.VITE_API_URL}/${company.logo}`
                        }
                        className="w-24 rounded-lg"
                      />
                      <LiaTrashAlt
                        onClick={() => updateImage()}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
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
                  {company.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Company;
