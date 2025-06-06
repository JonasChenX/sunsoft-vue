import axios from "axios";
import {Ss902TableItemType} from "@/components/ss902w/ss902-item-type";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//查詢登入紀錄
export const getLoginLog = (request : Record<string, string>): Promise<{ data: Ss902TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/ss902/getLoginLog`, request);
};
