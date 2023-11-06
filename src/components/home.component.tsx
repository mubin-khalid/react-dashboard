import { useCompanyActions } from "actions/company.actions";
import { useEffect } from "react";

const Home = () => {
  const companyActions = useCompanyActions();

  useEffect(() => {
    companyActions.getList();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="m-auto">
        <h1 className="text-4xl">Home</h1>
      </div>
    </div>
  );
};

export default Home;
