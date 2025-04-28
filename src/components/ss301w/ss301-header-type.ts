import { STableHeaderType } from "@/common/s-table/s-table-type";

//序號 登入帳號 登入IP 登入結果 登入時間
export const ss301TableHeader : STableHeaderType[] = [
    {
        title: '序號',
        key: 'indexId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '使用者ID',
        key: 'userId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '使用者名稱',
        key: 'userName',
        sortable: true,
        align: 'center'
    },
    {
        title: '使用者信箱',
        key: 'userEmail',
        sortable: true,
        align: 'center',
    },
    {
        title: '角色名稱',
        key: 'roleName',
        sortable: true,
        align: 'center'
    },
    {
        title: '到職日期',
        key: 'hireDate',
        sortable: true,
        align: 'center'
    },
    {
        title: '最後更新時間',
        key: 'lastUpdateAt',
        sortable: true,
        align: 'center'
    },
    {
        title: '最後更新者',
        key: 'lastUpdateBy',
        sortable: true,
        align: 'center'
    },
    {
        title: '最後密碼更新時間',
        key: 'lastPwdUpdateAt',
        sortable: true,
        align: 'center'
    },
    {
        title: '員工內容',
        key: 'details',
        align: 'center',
        sortable: false
    },
]