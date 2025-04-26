import { STableItemType } from "@/common/s-table/s-table-type";

export interface Ss902TableItemType extends STableItemType {
    indexId: number,
    // 登入帳號
    userId: string;
    // IP
    clientIp: string;
    // 登入結果 (例如: 成功、失敗)
    success: string;
    // 登入時間
    executedAt: string;
}

export const ss902TableItemsTest: Ss902TableItemType[] = [
    {
        id: 1,
        indexId:1,
        userId: 'user001',
        clientIp: '192.168.1.10',
        success: '成功',
        executedAt: '2025-04-26 08:30:15',
    },
    {
        id: 2,
        indexId:2,
        userId: 'admin88',
        clientIp: '10.0.0.5',
        success: '失敗',
        executedAt: '2025-04-26 09:01:42',
    },
    {
        id: 3,
        indexId:3,
        userId: 'test_user',
        clientIp: '172.16.0.3',
        success: '成功',
        executedAt: '2025-04-26 10:45:09',
    },
    {
        id: 4,
        indexId:4,
        userId: 'jane_doe',
        clientIp: '203.0.113.22',
        success: '失敗',
        executedAt: '2025-04-25 23:59:59',
    },
    {
        id: 5,
        indexId:5,
        userId: 'johnsmith',
        clientIp: '192.0.2.45',
        success: '成功',
        executedAt: '2025-04-26 12:00:00',
    }
];