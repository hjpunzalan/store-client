import { AxiosError, AxiosResponse } from "axios";
import { history } from "src";
import { Basket as BasketType } from "../models/basket";
import { storeAPI } from "./../../helpers/axios";

const responseBody = <T = any>(response: AxiosResponse<T>) => response.data;

const sleep = () =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      return resolve();
    }, 500)
  );

storeAPI.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      const { data, status } = error.response!;
      if ((data as any).errors && status === 400) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key]);
          }
        }

        throw modelStateErrors.flat();
      }
      //   toast(`${status} - ${(data as any).title}`, {
      //     type: "error",
      //   });

      if (status.toString().startsWith("5")) {
        history.push({
          pathname: "/server-error",
          state: {
            error: data,
          },
        });
      }
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) => storeAPI.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) => storeAPI.post(url, body).then((res) => responseBody<T>(res)),
  put: (url: string, body: {}) => storeAPI.put(url, body).then(responseBody),
  delete: (url: string) => storeAPI.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("/products", params),
  details: (id: number) => requests.get(`/products/${id}`),
  fetchFilters: () => requests.get("/products/filters"),
};

const Basket = {
  get: () => requests.get("/basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post<BasketType>(`/basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`/basket?productId=${productId}&quantity=${quantity}`),
};

const TestErrors = {
  get400Error: () => requests.get("/Buggy/bad-request").catch((err) => console.log(err)),
  get401Error: () => requests.get("/Buggy/unauthorised").catch((err) => console.log(err)),
  get404Error: () => requests.get("/Buggy/not-found").catch((err) => console.log(err)),
  get500Error: () => requests.get("/Buggy/server-error").catch((err) => console.log(err)),
  getValidationError: () =>
    requests.get("/Buggy/validation-error").catch((err) => {
      throw err;
    }),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
