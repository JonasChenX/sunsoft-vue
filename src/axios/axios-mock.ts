import axios, {AxiosRequestConfig} from "axios";

export const TOKEN_STR = 'Bearer accountApiMock-token'
export const MOCK_URL = '/mock/api';

export const validateAuthHeader = (config: AxiosRequestConfig, validToken: string): boolean => {
    return config.headers?.Authorization === validToken;
};

import MockAdapter from "axios-mock-adapter";
export const apiMock = new MockAdapter(axios);



import '@/components/ss101w/ss101w-api-mock'
import '@/core/login/account-api-mock'
export { axios };