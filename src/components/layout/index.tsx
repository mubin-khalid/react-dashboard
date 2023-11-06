// @/components/Layout/index.js
import React, { FC, ReactNode, useState } from "react";
import Sidebar from "components/layout/sidebar.component";
import MenuBarMobile from "components/layout/menubar-mobile.component";
import { useRecoilValue } from "recoil";
import { authAtom } from "state/auth";
import Login from "components/login.component";

type LayoytType = {
  children: ReactNode;
};

const Layout: FC<LayoytType> = ({ children }) => {
  const auth = useRecoilValue(authAtom);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <React.Fragment>
      {!auth || !auth.token || auth.token === "" ? (
        <Login />
      ) : (
        <div className="min-h-screen">
          <div className="flex">
            <MenuBarMobile setter={setShowSidebar} />
            <Sidebar show={showSidebar} setter={setShowSidebar} />
            <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
              {children}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Layout;
