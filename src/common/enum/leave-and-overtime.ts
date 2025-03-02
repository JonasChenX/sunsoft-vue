
//類型 (請假-常用 請假-特殊 加班)
//種類 請假-常用(事假 公假 病假 特休 補休 曠職)
//種類 請假-特殊(婚假 殤假 陪產假 產檢假 家庭照顧假 其他假)
//種類 加班(上班日延退 放假日加班)

export enum Type {
    RegularLeave = "請假-常用",
    SpecialLeave = "請假-特殊",
    Overtime = "加班",
    AnnualLeaveRequest = "申請時數"
}

export enum Category {
    // 常用請假
    CasualLeave = "事假",
    PublicLeave = "公假",
    SickLeave = "病假",
    Absence = "曠職",

    //常用請假 或 申請時數
    AnnualLeave = "年假(特休)",
    CompensatoryLeave = "補休",

    // 特殊請假
    MarriageLeave = "婚假",
    MaternityLeave = "殮假",
    PaternityLeave = "陪產假",
    PrenatalLeave = "產檢假",
    FamilyCareLeave = "家庭照顧假",
    OtherLeave = "其他假",

    // 加班
    RegularDayOvertime = "上班日延退",
    HolidayOvertime = "放假日加班"
}

export const getColorByType = (type : string) => {
    switch (type){
        case Type.RegularLeave:
            return 'red'
        case Type.SpecialLeave:
            return 'red'
        case Type.Overtime:
            return 'green'
        case Type.AnnualLeaveRequest:
            return 'green'
    }
}