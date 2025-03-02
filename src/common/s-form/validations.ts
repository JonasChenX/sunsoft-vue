import { Ref } from "vue";
import { useVuelidate } from "@vuelidate/core";

/**
 * 將表單 Reactive 物件與驗證規則及其他表單基本操作進行包裝。
 * @param rules 驗證規則。
 * @param form 表單物件。
 * @param formDefaults 表單物件初始值。
 * @param options Vuelidate 配置選項。
 */
export const useValidation = <T extends object>(
    rules: object,
    form: T | Ref<T>,
    formDefaults: T,
    options = { $autoDirty: true, $lazy: true }
) => {
    const $v = useVuelidate(rules, form, options);

    /**
     * 重設表單及驗證狀態。
     */
    const reset = () => {
        const targetForm = (form as Ref<T>).value || form;
        for (const [key, value] of Object.entries(formDefaults)) {
            (targetForm as any)[key] = value;
        }
    };

    /**
     * 確認表單是否符合驗證規則。
     * @returns 表單驗證是否通過。
     */
    async function checkValidity(): Promise<boolean> {
        return await $v.value.$validate();
    }

    return {
        $v,
        checkValidity,
        reset,
    };
}