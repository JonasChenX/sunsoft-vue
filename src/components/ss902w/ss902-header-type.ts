import { STableHeaderType } from "@/common/s-table/s-table-type";

//序號 登入帳號 登入IP 登入結果 登入時間
export const ss902TableHeader : STableHeaderType[] = [
    {
        title: '序號',
        key: 'indexId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '登入帳號',
        key: 'userId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '登入IP',
        key: 'clientIp',
        sortable: true,
        align: 'center'
    },
    {
        title: '登入結果',
        key: 'success',
        sortable: true,
        align: 'center',
    },
    {
        title: '登入時間',
        key: 'executedAt',
        sortable: true,
        align: 'center'
    }
]