import { STORE_SERVER } from "./../constants/envars";

import axios from "axios";
export const storeAPI = axios.create({
	baseURL: STORE_SERVER,
});
