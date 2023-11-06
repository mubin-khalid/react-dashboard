import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "components/layout";
import Company from "components/company.component";
import { RecoilRoot } from "recoil";
import Home from "components/home.component";
import Employee from "components/employee.component";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Fragment>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Company />} />
              <Route path="/employees" element={<Employee />} />
            </Routes>
          </Layout>
        </Fragment>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
