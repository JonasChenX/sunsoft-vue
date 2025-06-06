import {AxiosRequestConfig} from 'axios';
import {accountTypeTest} from "@/core/login/account-type";
import {TOKEN_STR, validateAuthHeader} from "@/axios/axios-mock";
import MockAdapter from "axios-mock-adapter";

export const setupAccountAPIMock = (apiMock: MockAdapter, MOCK_URL: string) => {
    apiMock.onPost(`${MOCK_URL}/authenticate`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, TOKEN_STR]); // 返回模擬的數據
            }, 1000);
        });
    });

    apiMock.onGet(`${MOCK_URL}/profiles`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, { activeProfiles: ['prod'] }]);
            }, 2000);
        });
    });

    apiMock.onGet(`${MOCK_URL}/account`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!validateAuthHeader(config, TOKEN_STR)) {
                    resolve([401, {}]);
                    return;
                }
                resolve([200, { ...accountTypeTest }]);
            }, 4000);
        });
    });

    apiMock.onPost(`${MOCK_URL}/writeFunctionUsageLog`).reply((config: AxiosRequestConfig) => {
        return new Promise((resolve) => {
            if (!validateAuthHeader(config, TOKEN_STR)) {
                resolve([401, {}]);
                return;
            }
            setTimeout(() => {
                resolve([200, {}]);
            }, 1000);
        });
    });
};

