import { Ss101TableItemType } from "@/components/ss101w/ss101-item-type";
import axios from "axios";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//申請紀錄查詢(特休/請假/加班)
export const queryApplicationRecords = (request : Record<string, string>): Promise<{ data: Ss101TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/queryApplicationRecords`, { params: request });
};
