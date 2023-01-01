import { AxiosResponse } from "axios";
import { storeAPI } from "./../../helpers/axios";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => storeAPI.get(url).then(responseBody),
	post: (url: string, body: {}) => storeAPI.post(url, body).then(responseBody),
	put: (url: string, body: {}) => storeAPI.put(url, body).then(responseBody),
	delete: (url: string) => storeAPI.delete(url).then(responseBody),
};

const Catalog = {
	list: () => requests.get("/products"),
	details: (id: number) => requests.get(`/products/${id}`),
};

const TestErrors = {
	get400Error: () => requests.get("/Buggy/bad-request"),
	get401Error: () => requests.get("/Buggy/unauthorised"),
	get404Error: () => requests.get("/Buggy/not-found"),
	get500Error: () => requests.get("/Buggy/server-error"),
	getValidationError: () => requests.get("/Buggy/validation-error"),
};

const agent = {
	Catalog,
	TestErrors,
};

export default agent;
