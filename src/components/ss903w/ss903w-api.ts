import axios from "axios";
import {Ss903TableItemType} from "@/components/ss903w/ss903-item-type";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//查詢登入紀錄
export const getFunIdLog = (request : Record<string, string>): Promise<{ data: Ss903TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/ss903/getFunIdLog`, request);
};
