import {InputType} from "@/common/s-form/input-type-enmu";

export const ss902FormConfig = {
    formModel:{
        logDate: '',
        exeType:''
    },
    groups:[
        {
            type: InputType.InputDate,
            label: "查詢日期",
            isFull: false,
            modelName: "logDate",
        },
        {
            type: InputType.Select,
            label: "類型",
            isFull: false,
            modelName: "exeType",
            optionItem:[
                {
                    title: "全部",
                    value: ""
                },
                {
                    title: "登入失敗",
                    value: "N"
                },
                {
                    title: "登入成功",
                    value: "Y"
                }
            ]
        },
    ]
}