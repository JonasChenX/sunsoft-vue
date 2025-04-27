import { AxiosRequestConfig } from 'axios';
import { TOKEN_STR, validateAuthHeader } from "@/axios/axios-mock";
import MockAdapter from "axios-mock-adapter";
import {ss904TableItemsTest} from "@/components/ss904w/ss904-item-type";

export const setupSs904APIMock = (apiMock: MockAdapter, MOCK_URL: string) => {
    apiMock.onPost(`${MOCK_URL}/getAPIExeLog`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!validateAuthHeader(config, TOKEN_STR)) {
                    resolve([401, {}]);
                    return;
                }
                resolve([200, [...ss904TableItemsTest]]); // 返回模擬的數據
            }, 2000); // 延遲 2 秒後回應
        });
    });
}
