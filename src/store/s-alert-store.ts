import { defineStore } from 'pinia';

export interface SAlertStoreStorable {
    visible: boolean;
    message: string;
    type: AlertType;
}
type AlertType = 'success' | 'error' | 'warning' | 'info';

export const useSAlertStore = defineStore('s-alert', {
    state: (): SAlertStoreStorable => ({
        visible: false,
        message: '',
        type: 'info', // 'success' | 'error' | 'warning' | 'info'
    }),
    getters: {
        isVisible: state => state.visible,
    },
    actions: {
        showAlert(message: string, type: AlertType = 'info') {
            this.message = message;
            this.type = type;
            this.visible = true;
        }
    }
});
