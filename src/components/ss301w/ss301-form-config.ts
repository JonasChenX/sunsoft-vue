import {InputType} from "@/common/s-form/input-type-enmu";
import {required} from "@/common/s-form/vuelidate";

export const ss301QueryFormConfig = {
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

// 基本資料 -> 信箱 使用者名稱 密碼 到職日期 角色
export const ss301CreateStep1FormConfig = {
    formModel:{
        userEmail: '',
        userName: '',
        userPwd: '',
        hireDate: '',
        role: '',
    },
    groups:[
        {
            type: InputType.InputText,
            label: "員工信箱",
            placeholder: "請輸入信箱",
            isFull: false,
            modelName: "userEmail",
            validation: {
                required
            }
        },
        {
            type: InputType.InputText,
            label: "員工姓名",
            placeholder: "請輸入姓名",
            isFull: false,
            modelName: "userName",
            validation: {
                required
            }
        },
        {
            type: InputType.inputPwd,
            label: "員工密碼",
            placeholder: "請輸入密碼",
            isFull: false,
            modelName: "userPwd",
            validation: {
                required
            }
        },
        {
            type: InputType.InputDate,
            label: "到職日期",
            isFull: false,
            modelName: "hireDate",
            validation: {
                required
            }
        },
        {
            type: InputType.Select,
            label: "角色",
            isFull: false,
            modelName: "role",
            optionItem:[
                {
                    title:"角色1",
                    value:"A"
                },
                {
                    title:"角色2",
                    value:"S"
                },
            ],
            validation: {
                required
            }
        },
    ]
}


// 詳細資料 -> 性別 出生日期 身分證字號 聯絡電話 縣市 地址 血型 緊急聯絡人 緊急聯絡人電話 緊急聯絡人關係
export const ss301CreateStep2FormConfig = {
    formModel:{
        gender: '', //性別
        birthDate: '', //生日
        idNumber: '', //身分證字號
        phone: '', //電話
        city: '', //縣市
        address: '', //地址
        bloodType: '', //血型
        emergencyContact: '', //緊急聯絡人
        emergencyContactPhone: '', //緊急聯絡人電話
        emergencyContactRelation: '', //緊急聯絡人關係
    },
    groups:[
        {
            type: InputType.Select,
            label: "性別",
            isFull: false,
            modelName: "gender",
            optionItem: [
                { title: "男", value: "M" },
                { title: "女", value: "F" },
            ],
            validation: { required }
        },
        {
            type: InputType.InputDate,
            label: "出生日期",
            isFull: false,
            modelName: "birthDate",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "身分證字號",
            placeholder: "請輸入身分證字號",
            isFull: false,
            modelName: "idNumber",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "聯絡電話",
            placeholder: "請輸入聯絡電話",
            isFull: false,
            modelName: "phone",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "縣市",
            placeholder: "請輸入縣市",
            isFull: false,
            modelName: "city",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "地址",
            placeholder: "請輸入地址",
            isFull: true,
            modelName: "address",
            validation: { required }
        },
        {
            type: InputType.Select,
            label: "血型",
            isFull: false,
            modelName: "bloodType",
            optionItem: [
                { title: "A", value: "A" },
                { title: "B", value: "B" },
                { title: "AB", value: "AB" },
                { title: "O", value: "O" },
            ],
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "緊急聯絡人",
            placeholder: "請輸入緊急聯絡人姓名",
            isFull: false,
            modelName: "emergencyContact",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "緊急聯絡人電話",
            placeholder: "請輸入電話",
            isFull: false,
            modelName: "emergencyContactPhone",
            validation: { required }
        },
        {
            type: InputType.InputText,
            label: "與聯絡人關係",
            placeholder: "請輸入關係",
            isFull: false,
            modelName: "emergencyContactRelation",
            validation: { required }
        }
    ]
}

//技術 -> 技術專長 語言能力
export const ss301CreateStep3FormConfig = {
    formModel:{
        progLang: [],
        chineseCommunication: '',
        englishCommunication: '',
    },
    groups:[
        {
            type: InputType.SelectM,
            label: "程式語言",
            isFull: false,
            modelName: "progLang",
            optionItem: [
                { title: "JAVA", value: "1" },
                { title: "Vue", value: "2" },
            ],
            validation: {
                required
            }
        },
        {
            type: InputType.Slider,
            label: "中文溝通能力",
            isFull: true,
            modelName: "chineseCommunication",
            ticksItem: {
                0: '不會',
                1: '還好',
                2: '可以',
                3: '專業'
            },
        },
        {
            type: InputType.Slider,
            label: "英文溝通能力",
            isFull: true,
            modelName: "englishCommunication",
            ticksItem: {
                0: '不會',
                1: '還好',
                2: '可以',
                3: '專業'
            },
        },
    ]
}