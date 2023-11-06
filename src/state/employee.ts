import { atom } from "recoil";
import { EmployeeType, EmployeesType } from "components/types/employee";

export const employeesAtom = atom({
  key: "employees",
  default: [] as unknown as EmployeesType,
});

export const employeeAtom = atom({
  key: "employee",
  default: {} as EmployeeType,
});
