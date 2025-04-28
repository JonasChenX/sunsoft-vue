import { STableItemType } from "@/common/s-table/s-table-type";

export interface Ss301TableItemType extends STableItemType {
    indexId: number,
    // 使用者ID
    userId: string;
    // 使用者名稱
    userName: string;
    // 使用者信箱(帳號)
    userEmail: string;
    // 角色ID
    roleId: string;
    // 角色名稱
    roleName: string;
    // 到職日期
    hireDate: string;
    // 最後更新時間
    lastUpdateAt: string;
    // 最後更新者
    lastUpdateBy: string;
    // 最後密碼更新時間
    lastPwdUpdateAt: string;
}
