import { Link } from "react-router-dom";
import { FiMenu as Icon } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

import logo from "../../../public/favicon.svg";
import { Dispatch, SetStateAction } from "react";

export default function MenuBarMobile({
  setter,
}: {
  setter: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
      >
        <Icon />
      </button>
      <Link to="/" className="mx-auto">
        {/*eslint-disable-next-line*/}
        <img src={logo} alt="Company Logo" width={50} height={50} />
      </Link>
      <Link className="text-3xl flex text-white" to="/login">
        <FaUser />
      </Link>
    </nav>
  );
}
