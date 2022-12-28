import axios from "axios";
import { STORE_SERVER } from "src/constants/envars";
export const storeAPI = axios.create({
	baseURL: STORE_SERVER,
});
