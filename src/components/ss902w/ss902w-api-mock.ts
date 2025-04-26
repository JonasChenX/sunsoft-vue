import { AxiosRequestConfig } from 'axios';
import { TOKEN_STR, validateAuthHeader } from "@/axios/axios-mock";
import MockAdapter from "axios-mock-adapter";
import {ss902TableItemsTest} from "@/components/ss902w/ss902-item-type";

export const setupSs902APIMock = (apiMock: MockAdapter, MOCK_URL: string) => {
    apiMock.onPost(`${MOCK_URL}/getLoginLog`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!validateAuthHeader(config, TOKEN_STR)) {
                    resolve([401, {}]);
                    return;
                }
                resolve([200, [...ss902TableItemsTest]]); // 返回模擬的數據
            }, 2000); // 延遲 2 秒後回應
        });
    });
}
