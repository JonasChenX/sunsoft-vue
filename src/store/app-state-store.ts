import { defineStore } from 'pinia';

export interface AccountStateStorable {
    viewLoading: boolean; //畫面載入中
}

export const useAppStateStore = defineStore('app-state', {
    state: (): AccountStateStorable => ({
        viewLoading: false,
    }),
    getters: {
        isViewLoading: state => state.viewLoading,
    },
    actions: {
        viewLoadingStart() {
            this.viewLoading = true
        },
        viewLoadingEnd() {
            this.viewLoading = false
        }
    }
});
