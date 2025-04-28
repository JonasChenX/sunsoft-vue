import axios from "axios";
import {Ss301TableItemType} from "@/components/ss301w/ss301-item-type";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//查詢全部員工
export const queryUserAccount = (request : Record<string, string>): Promise<{ data: Ss301TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/ss301/queryUserAccount`, request);
};
