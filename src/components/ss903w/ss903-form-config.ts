import {InputType} from "@/common/s-form/input-type-enmu";

export const ss903FormConfig = {
    formModel:{
        logDate: ''
    },
    groups:[
        {
            type: InputType.InputDate,
            label: "查詢日期",
            isFull: false,
            modelName: "logDate",
        }
    ]
}