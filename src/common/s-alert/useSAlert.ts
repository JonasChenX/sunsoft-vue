import {useSAlertStore} from "@/store/s-alert-store";

export const useAlert = () => {
    const alertStore = useSAlertStore();

    const success = (message: string) => {
        show(message, 'success');
    }

    const error = (message: string) => {
        show(message, 'error');
    }

    const warning = (message: string) => {
        show(message, 'warning');
    }

    const info = (message: string) => {
        show(message, 'info');
    }

    const show = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
        alertStore.showAlert(message, type);
    }

    return {
        success,
        error,
        warning,
        info,
    };
}