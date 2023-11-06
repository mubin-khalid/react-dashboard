// @ts-nocheck
import { useRecoilState } from "recoil";

import { history } from "utils/history";
import { authAtom } from "state/auth";
import { useAlertActions } from "actions/alert.actions";

export { useFetchWrapper };

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const alertActions = useAlertActions();

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    putMutlipart: multipartRequest("POST"),
  };

  function request(method: string) {
    return (url: string, body?: unknown) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  function multipartRequest(method: string) {
    return (url: string, body: unknown) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      requestOptions.headers = {
        Authorization: requestOptions.headers.Authorization,
      };
      requestOptions.body = body;

      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    const header = {
      "Content-Type": "application/json",
    };
    if (isLoggedIn && isApiUrl) {
      return {
        Authorization: `Bearer ${token}`,
        ...header,
      };
    }
    return header;
  }

  function handleResponse(response: {
    text: () => Promise<unknown>;
    ok: unknown;
    status: number;
    statusText: unknown;
  }) {
    return response.text().then((text: unknown) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem("user");
          setAuth(null);
          history.push("/login");
        }

        const error = (data && data.message) || response.statusText;
        alertActions.error(error);
        return Promise.reject(error);
      }

      return data;
    });
  }
}
