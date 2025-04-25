import axios from "axios";
import '@/axios/axios-mock'

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";

//初始化ss001w
export const initBySs001 = (): Promise<any> => {
    return axios.get(`${BASE_URL}/api/ss001/init`);
}

//打卡
export const clockInOrOut = (request: Record<string, string>): Promise<any> => {
    return axios.post(`${BASE_URL}/api/ss001/clockInOrOut`, request);
}