import {InputType} from "@/common/s-form/input-type-enmu";

export const ss301FormConfig = {
    formModel:{
        hireYearMonth: ''
    },
    groups:[
        {
            type: InputType.InputDateM,
            label: "到職年月",
            isFull: false,
            modelName: "hireYearMonth",
        }
    ]
}