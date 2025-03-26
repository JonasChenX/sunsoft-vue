import axios, {AxiosRequestConfig} from "axios";

export const TOKEN_STR = 'Bearer accountApiMock-token'
export const MOCK_URL = '/mock/api';

export const validateAuthHeader = (config: AxiosRequestConfig, validToken: string): boolean => {
    return config.headers?.Authorization === validToken;
};

import MockAdapter from "axios-mock-adapter";
import {setupAccountAPIMock} from "@/core/login/account-api-mock";
import {setupSs101APIMock} from "@/components/ss101w/ss101w-api-mock";
export const apiMock = new MockAdapter(axios);

setupAccountAPIMock(apiMock, MOCK_URL);
setupSs101APIMock(apiMock, MOCK_URL);