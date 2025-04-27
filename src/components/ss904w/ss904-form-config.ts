import {InputType} from "@/common/s-form/input-type-enmu";

export const ss904FormConfig = {
    formModel:{
        logDate: '',
        exeType:'',
        funCode:''
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
                    title: "執行失敗",
                    value: "N"
                },
                {
                    title: "執行成功",
                    value: "Y"
                }
            ]
        },
        {
            type: InputType.Select,
            label: "功能代號",
            isFull: false,
            modelName: "funCode",
            optionItem:[
                {
                    title: "全部",
                    value: ""
                }
            ]
        },
    ]
}