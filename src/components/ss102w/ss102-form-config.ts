import {InputType} from "@/common/s-form/input-type-enmu";

export const ss102formConfig = {
    formModel:{
        searchStartTime: '',
        searchEndTime: '',
    },
    groups:[
        {
            type: InputType.InputDate,
            label: "查詢時間起",
            isFull: false,
            modelName: "searchStartTime",
        },
        {
            type: InputType.InputDate,
            label: "查詢時間迄",
            isFull: false,
            modelName: "searchEndTime",
        }
    ]
}