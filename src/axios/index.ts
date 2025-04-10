import axios from 'axios';
import { useAccountStore } from '@/store/account-store';
import router from "@/router";

const TIMEOUT = 1000000; // 設定請求的超時時間（單位為毫秒）

const onRequestSuccess = (config: any) => {
    const accountStore = useAccountStore();
    const token = localStorage.getItem(accountStore.getAuthenticationTokenKey) || sessionStorage.getItem(accountStore.getAuthenticationTokenKey);
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;

        const functionId = accountStore.getCurrentFunctionId;
        if (functionId) {
            config.headers['X-FUNCTION-ID'] = functionId;
        }
    }
    //設定請求的超時時間
    config.timeout = TIMEOUT;
    config.url = `${config.url}`;
    return config;
};

//設置 Axios 攔截器，這裡設置兩個回調函數來處理錯誤情況
const setupAxiosInterceptors = (
    onUnauthenticated: (err: any) => Promise<any> | void,  // 用來處理未授權錯誤（如 token 過期）
    onServerError: (err: any) => Promise<any> | void       // 用來處理伺服器錯誤（如 500 錯誤）
) => {
    const onResponseError = (err : any) => {
        const accountStore = useAccountStore();
        // 日誌打印錯誤詳細內容
        console.log('err', JSON.parse(JSON.stringify(err)));
        // 獲取錯誤的狀態碼
        const status = err.status || err.response?.status;
        //若沒有授權或 token 過期，則登出並跳轉到登入頁面
        if (status === 403 || status === 401) {
            accountStore.logout();
            router.push('/');
            sessionStorage.removeItem(accountStore.getRequestedUrlKey);
            return onUnauthenticated(err);
        }
        if (status >= 500) {
            return onServerError(err);
        }
        return Promise.reject(err);
    };

    // 設置 Axios 攔截器
    if (axios.interceptors) {
        // 在發送請求之前，使用 onRequestSuccess 攔截器來修改請求配置
        axios.interceptors.request.use(onRequestSuccess);
        // 在收到回應之後，使用 onResponseError 攔截器來處理錯誤
        axios.interceptors.response.use(res => res, onResponseError);
    }
};

export { onRequestSuccess, setupAxiosInterceptors };
