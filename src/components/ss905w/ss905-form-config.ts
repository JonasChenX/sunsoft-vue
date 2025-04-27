import {InputType} from "@/common/s-form/input-type-enmu";
import {required} from "@/common/s-form/vuelidate";
import { formatFun } from '@/common/fun/fun-main'

export const ss905FormConfig = {
    formModel:{
        logDate: formatFun.formatDate(new Date())
    },
    groups:[
        {
            type: InputType.InputDate,
            label: "查詢日期",
            isFull: false,
            modelName: "logDate",
            validation: {
                required
            }
        }
    ]
}