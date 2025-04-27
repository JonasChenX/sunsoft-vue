import axios from "axios";
import {Ss904FunIdOptionType, Ss904TableItemType} from "@/components/ss904w/ss904-item-type";

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//功能API執行紀錄查看
export const getAPIExeLog = (request : Record<string, string>): Promise<{ data: Ss904TableItemType[] }> => {
    return  axios.post(`${BASE_URL}/api/ss904/getAPIExeLog`, request);
};

//取得功能代號下拉選單
export const getFunCodeOption = (): Promise<{ data: Ss904FunIdOptionType[] }> => {
    return  axios.get(`${BASE_URL}/api/ss904/getFunCodeOption`);
};


