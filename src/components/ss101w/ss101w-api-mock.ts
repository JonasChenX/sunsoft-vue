import {AxiosRequestConfig} from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// const MOCK_URL = '/mock/api';
import { ss101TableItemsTest } from "@/components/ss101w/ss101-item-type";
import {TOKEN_STR, validateAuthHeader, apiMock, MOCK_URL} from "@/axios/axios-mock";
//申請紀錄查詢(特休/請假/加班)
apiMock.onPost(`${MOCK_URL}/queryApplicationRecords`).reply((config: AxiosRequestConfig) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!validateAuthHeader(config, TOKEN_STR)) {
                resolve([401, {}]);
                return;
            }
            resolve([200, [...ss101TableItemsTest]]); // 返回模擬的數據
        }, 2000); // 延遲 2 秒後回應
    });
});
