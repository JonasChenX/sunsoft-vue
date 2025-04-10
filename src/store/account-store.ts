import { defineStore } from 'pinia';
import { AccountType } from "@/core/login/account-type";

export interface AccountStateStorable {
    logon: boolean; //是否正在登入過程中 (true 表示登入進行中，false 表示未登入或已登入完成)
    userIdentity: null | AccountType; //儲存使用者資訊
    authenticated: boolean; //使用者是否已成功登入 (true 代表已驗證身份，false 代表未登入或登入失敗)
    activeProfiles: string; //當前啟用的使用者設定檔 (Profiles)，可能用於區分不同的使用者權限或環境（例如開發、測試、正式環境）
    currentFunctionId: string; //目前使用者所執行的功能 ID，可能用於追蹤使用者當前正在操作的系統功能或頁面
}

export const useAccountStore = defineStore('account', {
    state: (): AccountStateStorable => ({
        logon: false,
        userIdentity: null,
        authenticated: false,
        activeProfiles: '',
        currentFunctionId: '',
    }),
    getters: {
        isLogon: state => state.logon,
        getAccount: state => state.userIdentity,
        isAuthenticated: state => state.authenticated,
        getActiveProfiles: state => state.activeProfiles,
        getCurrentFunctionId: state => state.currentFunctionId,
        getAuthenticationTokenKey: () => "ss-authenticationToken",
        getRequestedUrlKey: () => "requested-url"
    },
    actions: {
        authenticate() {
            this.logon = true;
        },
        setAuthenticated(identity: AccountType) {
            this.userIdentity = identity;
            this.authenticated = true;
            this.logon = false;
        },
        logout() {
            this.userIdentity = null;
            this.authenticated = false;
            this.logon = false;
        },
        setActiveProfiles(profile: string) {
            this.activeProfiles = profile;
        },
        setCurrentFunctionId(functionId: string) {
            this.currentFunctionId = functionId;
        }
    }
});
