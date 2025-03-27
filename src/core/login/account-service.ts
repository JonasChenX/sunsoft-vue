import { Router } from 'vue-router'; // 從 vue-router 套件導入 Router 類型
import { getAccount, getProfiles } from "@/core/login/account-api";
import { useAccountStore } from '@/store/account-store'; // 根據實際的 store 檔案路徑
import {Pinia} from 'pinia';

interface AccountServiceInterface {
    // 屬性
    authenticationTokenKey: string;
    requestedUrlKey: string;

    // 方法
    init(): void;
    retrieveProfiles(): Promise<boolean>;
    retrieveAccount(): Promise<boolean>;
    checkAuth(): Promise<boolean>;
    hasAnyAuthority(authorities: any): Promise<boolean>;

    // 計算屬性
    authenticated: boolean;
    userAuthoritiesList: any;
}

export default class AccountService implements AccountServiceInterface {
    private accountStore: ReturnType<typeof useAccountStore>;
    constructor(private pinia: Pinia, private router: Router) {
        this.accountStore = useAccountStore(this.pinia);
        this.init();
    }

    public init(): void {
        this.retrieveProfiles();
    }

    //取得 環境資訊
    public retrieveProfiles(): Promise<boolean> {
        console.log("retrieveProfiles");
        return new Promise(resolve => {
            getProfiles()
                .then(({ data }) => {
                    if (data?.activeProfiles) {
                        this.accountStore.setActiveProfiles(data['activeProfiles']);
                    }
                    resolve(true);
                })
                .catch(() => resolve(false))
        });
    }

    //取得 使用者資訊
    public retrieveAccount(): Promise<boolean> {
        console.log("retrieveAccount");
        return new Promise(resolve => {
            getAccount().then(({ data }) => {
                this.accountStore.authenticate();
                const account = data;
                console.log(account)
                if (account) {
                    this.accountStore.setAuthenticated(account);
                    const requestedUrl = sessionStorage.getItem(this.requestedUrlKey);
                    // 檢查是否有保存過的 URL 且不是 '/login'
                    if (requestedUrl) {
                        const url = requestedUrl === '/login' ? '/' : requestedUrl;
                        this.router.replace(url);
                    } else {
                        // 如果沒有 requested-url，跳轉到預設頁面
                        this.router.replace('/');
                    }
                    sessionStorage.removeItem(this.requestedUrlKey);

                } else {
                    this.accountStore.logout();
                    this.router.push('/');
                    sessionStorage.removeItem(this.requestedUrlKey);
                }
                resolve(true);
            })
            .catch(() => {
                this.accountStore.logout();
                resolve(false);
            })
        });
    }

    //檢核權限
    public checkAuth(): Promise<boolean> {
        console.log("checkAuth");
        if (!this.authenticated || !this.userAuthoritiesList) {
            const token = localStorage.getItem(this.authenticationTokenKey) || sessionStorage.getItem(this.authenticationTokenKey);
            if (!this.accountStore.getAccount && !this.accountStore.isLogon && token) {
                return this.retrieveAccount();
            } else {
                return Promise.resolve(false); // 如果已經認證過或有登入狀態，返回 false
            }
        }
        return Promise.resolve(true); // 已經授權，返回 true
    }

    //檢核功能代號匹配的權限
    public hasAnyAuthority(functionId: string): Promise<boolean> {
        console.log("hasAnyAuthority");
        return Promise.resolve(
            this.userAuthoritiesList.some((auth: string) => auth.startsWith(functionId))
        );
    }

    public get authenticated(): boolean {
        return this.accountStore.isAuthenticated;
    }

    public get userAuthoritiesList(): any {
        return this.accountStore.userIdentity?.['authoritiesList'];
    }

    public get authenticationTokenKey(): any {
        return this.accountStore.getAuthenticationTokenKey;
    }

    public get requestedUrlKey(): any {
        return this.accountStore.getRequestedUrlKey;
    }
}