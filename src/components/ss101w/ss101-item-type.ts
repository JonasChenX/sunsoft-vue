import { STableItemType } from "@/common/s-table/s-table-type";
import {Category, Type} from "@/common/enum/leave-and-overtime";

export interface Ss101TableItemType extends STableItemType {
    type: Type,               // 類型
    category: Category,           // 種類
    leaveTimeStart: string,     // 請假時間起
    leaveTimeEnd: string,       // 請假時間迄
    hours: number,              // 時數
    approvalStatus: string,     // 審核狀態
    approver: string,           // 審核人員
    sendTime: string,           // 發送時間
    lastUpdatedTime: string,    // 最後更新時間
    reason: string,             // 事由
    rejectionReason: string     // 退件原因
}

export const ss101TableItemsTest: Ss101TableItemType[] = [
    {
        id: 1,
        type: Type.RegularLeave,
        category: Category.CasualLeave,
        leaveTimeStart: "2025-02-01 09:00",
        leaveTimeEnd: "2025-02-01 18:00",
        hours: 8,
        approvalStatus: "Approved",
        approver: "John Doe",
        sendTime: "2025-01-30 08:00",
        lastUpdatedTime: "2025-01-30 09:00",
        reason: "Personal matters",
        rejectionReason: ""
    },
    {
        id: 2,
        type: Type.SpecialLeave,
        category: Category.MarriageLeave,
        leaveTimeStart: "2025-03-01 09:00",
        leaveTimeEnd: "2025-03-05 18:00",
        hours: 40,
        approvalStatus: "Approved",
        approver: "Jane Smith",
        sendTime: "2025-02-25 10:00",
        lastUpdatedTime: "2025-02-25 11:00",
        reason: "Wedding",
        rejectionReason: "",
        selectable: false,
    },
    {
        id: 3,
        type: Type.Overtime,
        category: Category.RegularDayOvertime,
        leaveTimeStart: "2025-02-10 19:00",
        leaveTimeEnd: "2025-02-10 23:00",
        hours: 4,
        approvalStatus: "Pending",
        approver: "",
        sendTime: "2025-02-10 18:30",
        lastUpdatedTime: "2025-02-10 18:30",
        reason: "Project deadline",
        rejectionReason: ""
    },
    {
        id: 4,
        type: Type.RegularLeave,
        category: Category.SickLeave,
        leaveTimeStart: "2025-02-15 09:00",
        leaveTimeEnd: "2025-02-15 17:00",
        hours: 8,
        approvalStatus: "Approved",
        approver: "Alex Lee",
        sendTime: "2025-02-14 08:00",
        lastUpdatedTime: "2025-02-14 08:30",
        reason: "Health issue",
        rejectionReason: ""
    },
    {
        id: 5,
        type: Type.SpecialLeave,
        category: Category.PrenatalLeave,
        leaveTimeStart: "2025-04-01 09:00",
        leaveTimeEnd: "2025-04-30 18:00",
        hours: 160,
        approvalStatus: "Approved",
        approver: "Mary Johnson",
        sendTime: "2025-03-28 11:00",
        lastUpdatedTime: "2025-03-28 12:00",
        reason: "Maternity leave",
        rejectionReason: ""
    },
    {
        id: 6,
        type: Type.RegularLeave,
        category: Category.AnnualLeave,
        leaveTimeStart: "2025-05-01 09:00",
        leaveTimeEnd: "2025-05-05 18:00",
        hours: 40,
        approvalStatus: "Pending",
        approver: "",
        sendTime: "2025-04-29 10:00",
        lastUpdatedTime: "2025-04-29 10:00",
        reason: "Vacation",
        rejectionReason: ""
    },
    {
        id: 7,
        type: Type.Overtime,
        category: Category.HolidayOvertime,
        leaveTimeStart: "2025-06-12 10:00",
        leaveTimeEnd: "2025-06-12 14:00",
        hours: 4,
        approvalStatus: "Approved",
        approver: "Samuel Clark",
        sendTime: "2025-06-12 09:30",
        lastUpdatedTime: "2025-06-12 09:40",
        reason: "Weekend project work",
        rejectionReason: ""
    },
    {
        id: 8,
        type: Type.SpecialLeave,
        category: Category.PaternityLeave,
        leaveTimeStart: "2025-07-01 09:00",
        leaveTimeEnd: "2025-07-03 18:00",
        hours: 24,
        approvalStatus: "Approved",
        approver: "Daniel Green",
        sendTime: "2025-06-30 08:00",
        lastUpdatedTime: "2025-06-30 08:15",
        reason: "Newborn child",
        rejectionReason: ""
    },
    {
        id: 9,
        type: Type.RegularLeave,
        category: Category.CompensatoryLeave,
        leaveTimeStart: "2025-08-10 09:00",
        leaveTimeEnd: "2025-08-10 18:00",
        hours: 8,
        approvalStatus: "Approved",
        approver: "Sophia White",
        sendTime: "2025-08-05 10:00",
        lastUpdatedTime: "2025-08-05 11:00",
        reason: "Overtime compensation",
        rejectionReason: ""
    },
    {
        id: 10,
        type: Type.SpecialLeave,
        category: Category.FamilyCareLeave,
        leaveTimeStart: "2025-09-01 09:00",
        leaveTimeEnd: "2025-09-03 18:00",
        hours: 24,
        approvalStatus: "Pending",
        approver: "",
        sendTime: "2025-08-30 09:00",
        lastUpdatedTime: "2025-08-30 09:00",
        reason: "Family emergency",
        rejectionReason: ""
    },
    {
        id: 11,
        type: Type.RegularLeave,
        category: Category.Absence,
        leaveTimeStart: "2025-10-05 09:00",
        leaveTimeEnd: "2025-10-05 17:00",
        hours: 8,
        approvalStatus: "Rejected",
        approver: "Ethan Black",
        sendTime: "2025-10-04 10:00",
        lastUpdatedTime: "2025-10-04 10:10",
        reason: "No show",
        rejectionReason: "Uninformed absence"
    },
    {
        id: 12,
        type: Type.SpecialLeave,
        category: Category.OtherLeave,
        leaveTimeStart: "2025-11-12 09:00",
        leaveTimeEnd: "2025-11-12 12:00",
        hours: 3,
        approvalStatus: "Approved",
        approver: "Olivia Taylor",
        sendTime: "2025-11-11 11:00",
        lastUpdatedTime: "2025-11-11 11:30",
        reason: "Personal business",
        rejectionReason: ""
    },
    {
        id: 13,
        type: Type.Overtime,
        category: Category.RegularDayOvertime,
        leaveTimeStart: "2025-12-10 18:00",
        leaveTimeEnd: "2025-12-10 22:00",
        hours: 4,
        approvalStatus: "Pending",
        approver: "",
        sendTime: "2025-12-10 17:30",
        lastUpdatedTime: "2025-12-10 17:45",
        reason: "Critical system update",
        rejectionReason: ""
    },
    {
        id: 14,
        type: Type.RegularLeave,
        category: Category.PublicLeave,
        leaveTimeStart: "2025-02-28 09:00",
        leaveTimeEnd: "2025-02-28 17:00",
        hours: 8,
        approvalStatus: "Approved",
        approver: "Lucas Brown",
        sendTime: "2025-02-27 14:00",
        lastUpdatedTime: "2025-02-27 14:30",
        reason: "Public holiday",
        rejectionReason: ""
    },
    {
        id: 15,
        type: Type.SpecialLeave,
        category: Category.MaternityLeave,
        leaveTimeStart: "2025-04-11 09:00",
        leaveTimeEnd: "2025-04-15 18:00",
        hours: 32,
        approvalStatus: "App",
        approver: "Ma Jo",
        sendTime: "2025-06-28 13:00",
        lastUpdatedTime: "2025-03-27 12:00",
        reason: "Maternity leave",
        rejectionReason: ""
    },
];