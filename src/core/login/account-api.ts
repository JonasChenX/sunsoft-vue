import axios from "axios";
import '@/axios/axios-mock'
import {isShowNotifyConfig} from "@/axios";

//取得token
export const getAuthenticate = (request : Record<string, string>): Promise<any> => {
    return axios.post('/mock/api/authenticate', { params: request });
};

//取得環境資訊
export const getProfiles = (): Promise<any> => {
    return axios.get('/mock/api/profiles');
}

//取得使用者資訊
export const getAccount = (): Promise<any> => {
    return axios.get('/mock/api/account', isShowNotifyConfig);
}

//紀錄功能使用量
export const writeFunctionUsageLog = () => {
    return axios.post('/mock/api/writeFunctionUsageLog',{});
}


