import {useNotification} from "@kyvg/vue3-notification";


export const useNotify = <T extends object>() => {
    const { notify }  = useNotification()
    //通知樣式
    const EXE_GROUP: string = "exe-notify"

    const successNotify = (title : string, text = "") => {
        return notify({
            group: EXE_GROUP,
            title: title,
            text: text,
            type: "success"
        });
    }

    const errorNotify = (title : string, text = "") => {
        return notify({
            group: EXE_GROUP,
            title: title,
            text: text,
            type: "error"
        });
    }

    return {
        successNotify,
        errorNotify
    }
}