import { Ss101TableItemType } from "@/components/ss101w/ss101-item-type";
import axios from "axios";
import '@/axios/axios-mock'
import {isShowNotifyConfig} from "@/axios";

//申請紀錄查詢(特休/請假/加班)
export const queryApplicationRecords = (request : Record<string, string>): Promise<{ data: Ss101TableItemType[] }> => {
    return  axios.post('/mock/api/queryApplicationRecords', { params: request }, isShowNotifyConfig);
};
