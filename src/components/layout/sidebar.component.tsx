// @ts-nocheck
import { Link, useLocation, useParams } from "react-router-dom";
import type { Location, Params } from "react-router-dom";

import { LiaBuilding, LiaHomeSolid, LiaUserSolid } from "react-icons/lia";
import { BiLogOutCircle } from "react-icons/bi";

import logo from "../../../public/favicon.svg";
import { useAuthActions } from "actions/auth.actions";

const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};

export default function Sidebar({ show, setter }) {
  const location = useLocation();
  const params = useParams();
  const userActions = useAuthActions();
  // Define our base class
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      getRoutePath(location, params) === route
        ? "text-white"
        : "text-white/50 hover:text-white";

    return (
      <Link
        to={route}
        onClick={() => {
          setter((oldVal: unknown) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: unknown) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex items-center justify-center">
          <Link to="/">
            {/*eslint-disable-next-line*/}
            <img src={logo} alt="Company Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="flex flex-col">
          <MenuItem name="Home" route="/" icon={<LiaHomeSolid />} />
          <MenuItem
            name="Companies"
            route="/companies"
            icon={<LiaBuilding />}
          />
          <MenuItem
            name="Employees"
            route="/employees"
            icon={<LiaUserSolid />}
          />
          <span
            className="text-white/50 hover:text-white flex absolute bottom-0"
            onClick={() => userActions.logout()}
          >
            <MenuItem name="Logout" route="/" icon={<BiLogOutCircle />} />
          </span>

          <a onClick={() => userActions.logout()}>Logout</a>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
