import axios from "axios";
import {Ss905TableItemType} from "@/components/ss905w/ss905-item-type";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//系統日誌查看
export const getFileLog = (request : Record<string, string>): Promise<{ data: Ss905TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/ss905/getFileLog`, request);
};

//系統日誌下載
export const getLogFileDownload = (id: string) => {
    return  axios.get(`${BASE_URL}/api/ss905/logFileDownload/${id}`,{responseType: 'blob'});
};


