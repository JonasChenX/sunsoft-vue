import { STableItemType } from "@/common/s-table/s-table-type";

export interface Ss903TableItemType extends STableItemType {
    indexId: number,
    // 使用者帳號
    userId: string;
    // 使用者名稱
    userName: string;
    //功能代號
    funId: string;
    //功能代號名稱
    funName: string;
    // IP
    clientIp: string;
    // 執行時間
    executedAt: string;
}

export const ss903TableItemsTest: Ss903TableItemType[] = [
    {
        id:1,
        indexId: 1,
        userId: "user001",
        userName: "王小明",
        funId: "SS001",
        funName: "打卡系統",
        clientIp: "192.168.0.1",
        executedAt: "2025-04-26T10:15:00",
    },
    {
        id:2,
        indexId: 2,
        userId: "user002",
        userName: "李小美",
        funId: "SS001",
        funName: "打卡系統",
        clientIp: "192.168.0.2",
        executedAt: "2025-04-26T10:20:00",
    },
    {
        id:3,
        indexId: 3,
        userId: "user003",
        userName: "陳大仁",
        funId: "SS902",
        funName: "登入紀錄查看",
        clientIp: "192.168.0.3",
        executedAt: "2025-04-26T10:25:00",
    },
    {
        id: 4,
        indexId: 4,
        userId: "user004",
        userName: "張小華",
        funId: "SS902",
        funName: "登入紀錄查看",
        clientIp: "192.168.0.4",
        executedAt: "2025-04-26T10:30:00",
    },
    {
        id: 5,
        indexId: 5,
        userId: "user005",
        userName: "林中原",
        funId: "SS902",
        funName: "登入紀錄查看",
        clientIp: "192.168.0.5",
        executedAt: "2025-04-26T10:35:00",
    }
];