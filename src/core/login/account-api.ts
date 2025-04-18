import axios from "axios";
import '@/axios/axios-mock'

const IS_OPEN_MOCK = import.meta.env.VITE_IS_OPEN_MOCK === "true";
const BASE_URL = IS_OPEN_MOCK ? "/mock" : "/sunsoft";


//取得token
export const getAuthenticate = (request : Record<string, string>): Promise<any> => {
    return axios.post(`${BASE_URL}/api/authenticate`, request);
};

//取得環境資訊
export const getProfiles = (): Promise<any> => {
    return axios.get(`${BASE_URL}/api/profiles`);
}

//取得使用者資訊
export const getAccount = (): Promise<any> => {
    return axios.get(`${BASE_URL}/api/account`);
}

//紀錄功能使用量
export const writeFunctionUsageLog = () => {
    return axios.get(`${BASE_URL}/api/writeFunctionUsageLog`);
}


