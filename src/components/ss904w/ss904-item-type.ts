import { STableItemType } from "@/common/s-table/s-table-type";

export interface Ss904TableItemType extends STableItemType {
    indexId: number,
    // 使用者帳號
    userId: string;
    // 使用者名稱
    userName: string;
    // IP
    clientIp: string;
    //功能代號
    funId: string;
    //功能代號名稱
    funName: string;
    //API描述
    apiDesc:string;
    //API URL
    apiUrl: string;
    //API參數
    apiParam: string;
    //API執行時間(毫秒)
    apiExeTimeMs: string;
    // 登入結果 (例如: 成功、失敗)
    success: string;
    // 登入時間
    executedAt: string;
}

export const ss904TableItemsTest: Ss904TableItemType[] = [
    {
        id: 1,
        indexId: 783,
        userId: "SS202502040001",
        userName: "系統管理員",
        clientIp: "127.0.0.1",
        funId: "SS001",
        funName: "A",
        apiDesc: "描述1",
        apiUrl: "POST /sunsoft/api/ss001/clockInOrOut",
        apiParam: '[{"clockKey":"ebf97018-6f82-47f0-ac3b-e00e8468ad3d","clockType":"IN"}]',
        apiExeTimeMs: "3",
        success: "失敗",
        executedAt: "2025-04-26 11:02:50",
    },
    {
        id: 2,
        indexId: 784,
        userId: "SS202502040002",
        userName: "王小明",
        clientIp: "192.168.0.2",
        funId: "SS002",
        funName: "B",
        apiDesc: "描述2",
        apiUrl: "GET /sunsoft/api/ss002/getUserInfo",
        apiParam: '[{"userId":"SS202502040002"}]',
        apiExeTimeMs: "5",
        success: "成功",
        executedAt: "2025-04-26 12:30:00",
    },
    {
        id: 3,
        indexId: 785,
        userId: "SS202502040003",
        userName: "李小華",
        clientIp: "10.0.0.3",
        funId: "SS003",
        funName: "C",
        apiDesc: "描述3",
        apiUrl: "POST /sunsoft/api/ss003/updatePassword",
        apiParam: '[{"password":"12345678"}]',
        apiExeTimeMs: "8",
        success: "成功",
        executedAt: "2025-04-26 13:45:20",
    },
    {
        id: 4,
        indexId: 786,
        userId: "SS202502040004",
        userName: "陳大安",
        clientIp: "172.16.5.4",
        funId: "SS004",
        funName: "D",
        apiDesc: "描述4",
        apiUrl: "DELETE /sunsoft/api/ss004/removeUser",
        apiParam: '[{"userId":"SS202502040004"}]',
        apiExeTimeMs: "7",
        success: "失敗",
        executedAt: "2025-04-26 15:10:10",
    },
    {
        id: 5,
        indexId: 787,
        userId: "SS202502040005",
        userName: "黃美麗",
        clientIp: "127.0.0.5",
        funId: "SS005",
        funName: "E",
        apiDesc: "描述5",
        apiUrl: "PUT /sunsoft/api/ss005/updateProfile",
        apiParam: '[{"nickname":"黃黃"}]',
        apiExeTimeMs: "6",
        success: "成功",
        executedAt: "2025-04-26 16:55:30",
    }
];

export interface Ss904FunIdOptionType {
    title: string;
    value: string;
}