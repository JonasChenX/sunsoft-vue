import {InputType} from "@/common/s-form/input-type-enmu";
import {Type} from "@/common/enum/leave-and-overtime";

export const ss101formConfig = {
    formModel:{
        leaveStartTime: '',
        leaveEndTime: '',
        type: ''
    },
    groups:[
        {
            type: InputType.InputDate,
            label: "查詢時間起",
            isFull: false,
            modelName: "leaveStartTime",
        },
        {
            type: InputType.InputDate,
            label: "查詢時間迄",
            isFull: false,
            modelName: "leaveEndTime",
        },
        {
            type: InputType.Select,
            label: "類型",
            isFull: false,
            modelName: "type",
            optionItem:[
                {
                    title: "全部",
                    value: ""
                },
                {
                    title: Type.RegularLeave,
                    value: "regularLeave"
                },
                {
                    title: Type.SpecialLeave,
                    value: "specialLeave"
                },
                {
                    title: Type.Overtime,
                    value: "overtime"
                }
            ],
        },
    ]
}