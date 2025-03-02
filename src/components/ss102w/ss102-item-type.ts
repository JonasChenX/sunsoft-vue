import { STableItemType } from "@/common/s-table/s-table-type";
import {Category, Type} from "@/common/enum/leave-and-overtime";

export interface Ss102TableItemType extends STableItemType {
    annualLeaveUsed: number; //已使用的特休時數
    annualLeaveRemaining: number; //剩餘的特休時數
    compensatoryLeaveUsed: number; //已使用的補休時數
    compensatoryLeaveRemaining: number; //剩餘的補休時數
    overtimeHours: number; //加班時數
    personalLeaveHours: number; //事假時數
    sickLeaveHours: number; //病假時數
    absenceHours: number; //曠職時數
    otherLeaveHours: number; //其他假別時數
}

export const ss102TableItemTest: Ss102TableItemType[] = [
    {
        id:1,
        annualLeaveUsed: 5,  // 已使用 5 小時特休
        annualLeaveRemaining: 10,  // 剩餘 10 小時特休
        compensatoryLeaveUsed: 2,  // 已使用 2 小時補休
        compensatoryLeaveRemaining: 3,  // 剩餘 3 小時補休
        overtimeHours: 8,  // 加班 8 小時
        personalLeaveHours: 4,  // 事假 4 小時
        sickLeaveHours: 1,  // 病假 1 小時
        absenceHours: 0,  // 無曠職時數
        otherLeaveHours: 2,  // 其他假別 2 小時
    }
]

//明細
//類型 種類 請假日 時間(起 迄) 時數 事由
export interface Ss102TableItemTypeB extends STableItemType {
    type: Type,                 // 類型
    category: Category,         // 種類
    leaveDate: string,          // 請假日期
    leaveTimeStart: string,     // 請假時間起
    leaveTimeEnd: string,       // 請假時間迄
    hours: number,              // 時數
    reason: string,             // 事由
}

export const ss102TableItemTestB: Ss102TableItemTypeB[] = [
    { id: 1, type: Type.AnnualLeaveRequest, category: Category.AnnualLeave, leaveDate: '2025-03-01', leaveTimeStart: '', leaveTimeEnd: '', hours: 80, reason: '十天年假' },
    { id: 2, type: Type.RegularLeave, category: Category.CasualLeave, leaveDate: '2025-03-01', leaveTimeStart: '08:00', leaveTimeEnd: '12:00', hours: 4, reason: '家中有事' },
    { id: 3, type: Type.SpecialLeave, category: Category.MarriageLeave, leaveDate: '2025-03-02', leaveTimeStart: '09:00', leaveTimeEnd: '17:00', hours: 8, reason: '結婚' },
    { id: 4, type: Type.Overtime, category: Category.RegularDayOvertime, leaveDate: '2025-03-03', leaveTimeStart: '18:00', leaveTimeEnd: '22:00', hours: 4, reason: '工作需求' },
    { id: 5, type: Type.RegularLeave, category: Category.SickLeave, leaveDate: '2025-03-05', leaveTimeStart: '09:00', leaveTimeEnd: '12:00', hours: 3, reason: '生病' },
    { id: 6, type: Type.SpecialLeave, category: Category.MaternityLeave, leaveDate: '2025-03-06', leaveTimeStart: '08:00', leaveTimeEnd: '17:00', hours: 8, reason: '產假' },
    { id: 7, type: Type.Overtime, category: Category.HolidayOvertime, leaveDate: '2025-03-07', leaveTimeStart: '10:00', leaveTimeEnd: '14:00', hours: 4, reason: '假日加班' },
    { id: 8, type: Type.AnnualLeaveRequest, category: Category.CompensatoryLeave, leaveDate: '2025-03-08', leaveTimeStart: '', leaveTimeEnd: '', hours: 4, reason: '端午節禮物' },
    { id: 9, type: Type.RegularLeave, category: Category.PublicLeave, leaveDate: '2025-03-09', leaveTimeStart: '09:00', leaveTimeEnd: '12:00', hours: 3, reason: '公共假期' },
    { id: 10, type: Type.SpecialLeave, category: Category.PaternityLeave, leaveDate: '2025-03-10', leaveTimeStart: '08:00', leaveTimeEnd: '17:00', hours: 8, reason: '陪產假' },
    { id: 11, type: Type.Overtime, category: Category.HolidayOvertime, leaveDate: '2025-03-11', leaveTimeStart: '09:00', leaveTimeEnd: '15:00', hours: 6, reason: '放假日加班' },
    { id: 12, type: Type.RegularLeave, category: Category.Absence, leaveDate: '2025-03-12', leaveTimeStart: '08:00', leaveTimeEnd: '09:00', hours: 1, reason: '曠職' },
    { id: 14, type: Type.SpecialLeave, category: Category.PrenatalLeave, leaveDate: '2025-03-14', leaveTimeStart: '08:00', leaveTimeEnd: '12:00', hours: 4, reason: '產檢假' },
    { id: 15, type: Type.Overtime, category: Category.RegularDayOvertime, leaveDate: '2025-03-15', leaveTimeStart: '17:00', leaveTimeEnd: '21:00', hours: 4, reason: '加班' },
    { id: 16, type: Type.SpecialLeave, category: Category.FamilyCareLeave, leaveDate: '2025-03-16', leaveTimeStart: '08:00', leaveTimeEnd: '12:00', hours: 4, reason: '照顧家人' },
    { id: 18, type: Type.SpecialLeave, category: Category.OtherLeave, leaveDate: '2025-03-18', leaveTimeStart: '08:00', leaveTimeEnd: '12:00', hours: 4, reason: '其他事由' },
    { id: 19, type: Type.Overtime, category: Category.HolidayOvertime, leaveDate: '2025-03-19', leaveTimeStart: '11:00', leaveTimeEnd: '15:00', hours: 4, reason: '假日加班' },
    { id: 20, type: Type.RegularLeave, category: Category.CasualLeave, leaveDate: '2025-03-20', leaveTimeStart: '09:00', leaveTimeEnd: '17:00', hours: 8, reason: '個人事務' }
]