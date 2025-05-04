import { maxLength, required } from "@/common/s-form/vuelidate";
import { InputType } from "@/common/s-form/input-type-enmu";
import { FileAcceptType } from "@/common/s-form/file-accept-type";

//給使用者設定
export interface SFormGroupsItemType {
    type: InputType;
    label: string;
    modelName: string;
    isFull?: boolean; //設定是否滿版
    maxLen?: number; //搭配inputText 限制長度
    placeholder?: string; //搭配inputText 提示內容
    textAreaContent?: string; //搭配checkbox 說明內容
    optionItem?: SFormItemOption[]; //搭配select、selectM 顯示內容
    ticksItem?: SFormItemTick; //搭配slider 顯示內容
    accept?: FileAcceptType[]; //搭配inputFile 限制檔案類型
    rows?: number; //搭配textArea 設定行數
    validation?: SFormValidation;
}

//初始化用
export interface SFormGroupsItemInitType extends SFormGroupsItemType{
    visible: boolean; //針對密碼隱碼
    search: string;
    editingItem: SFormItemOption | null; //搭配checkboxM
    previousModel: string | number | string[] | boolean | null; //搭配checkboxM 修改前的值
}

export interface SFormItemOption {
    title: string;
    value?: any; //checkboxM可不用 其他都要
    header?: boolean; //搭配checkboxM
}

interface SFormItemTick {
    [key: number]: string;
}

export interface SFormValidation {
    [key: string]: any;
}

export interface SFormFunction {
    getFormData: () => Promise<any>;
}

export interface SFormConfig {
    formModel: Record<string, string | number | any[] | null>;
    groups: SFormGroupsItemType[];
}

export const formConfigTest : SFormConfig = {
    formModel:{
        inputText1: 'A',
        inputDate1: '',
        inputDateM1: '',
        select1: '',
        selectM1: [],
        checkbox1: '',
        checkbox2: '',
        inputFile1: null,
        textArea1: '',
        slider1: 0,
    },
    groups:[
        {
            type: InputType.InputText,
            label: "測試一",
            isFull: false,
            modelName: "inputText1",
            maxLen: 20,
            placeholder: "請輸入AAA",
            validation: {
                required,
                maxLength : maxLength(10),
            }
        },
        {
            type: InputType.InputDate,
            label: "測試二",
            isFull: true,
            modelName: "inputDate1",
        },
        {
            type: InputType.InputDateM,
            label: "測試三",
            isFull: true,
            modelName: "inputDateM1",
        },
        {
            type: InputType.Select,
            label: "測試四",
            isFull: false,
            modelName: "select1",
            optionItem:[
                {
                    title:"AA",
                    value:"A"
                },
                {
                    title:"SS",
                    value:"S"
                },
            ],
        },
        {
            type: InputType.SelectM,
            label: "測試五",
            isFull: false,
            modelName: "selectM1",
            optionItem:[
                {
                    title:"YY",
                    value:"Y"
                },
                {
                    title:"UU",
                    value:"U"
                },
            ],
        },
        {
            type: InputType.Checkbox,
            label: "你同意嗎",
            isFull: false,
            modelName: "checkbox1",
        },
        {
            type: InputType.Checkbox,
            textAreaContent:"遵守以上原則嗎？",
            label: "是否同意",
            isFull: false,
            modelName: "checkbox2",
        },
        {
            type: InputType.InputFile,
            label: "上傳檔案",
            accept: [FileAcceptType.ImageAll, FileAcceptType.DocumentPdf],
            isFull: true,
            modelName: "inputFile1",
        },
        {
            type: InputType.TextArea,
            label: "自傳",
            isFull: true,
            modelName: "textArea1",
            rows: 3,
        },
        {
            type: InputType.Slider,
            label: "測試七",
            isFull: true,
            modelName: "slider1",
            ticksItem: {
                0: '不會',
                1: '還好',
                2: '可以',
                3: '專業'
            },
        },
    ]
}