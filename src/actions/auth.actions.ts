import { useRecoilState, useResetRecoilState } from "recoil";

import { useFetchWrapper, history } from "utils/index";
import { userAtom, authAtom } from "state/index";

export { useAuthActions };
function useAuthActions() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const fetchWrapper = useFetchWrapper();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAuth] = useRecoilState(authAtom);

  return {
    login,
    logout,
    resetUser: useResetRecoilState(userAtom),
  };

  function login({ email, password }: { email: string; password: string }) {
    return fetchWrapper
      .post(`${baseUrl}/api/login`, { email, password })
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(user);

        // get return url from location state or default to home page
        history.push("/");
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    history.push("/login");
  }
}
