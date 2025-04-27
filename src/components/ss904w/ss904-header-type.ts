import { STableHeaderType } from "@/common/s-table/s-table-type";

//序號 登入帳號 登入IP 登入結果 登入時間
export const ss904TableHeader : STableHeaderType[] = [
    {
        title: '序號',
        key: 'indexId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '使用者帳號',
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
        title: 'IP',
        key: 'clientIp',
        sortable: true,
        align: 'center'
    },
    {
        title: '功能代號',
        key: 'funId',
        sortable: true,
        align: 'center'
    },
    {
        title: '功能代號名稱',
        key: 'funName',
        sortable: true,
        align: 'center'
    },
    {
        title: 'URL',
        key: 'apiUrl',
        sortable: true,
        align: 'center'
    },
    {
        title: 'API描述',
        key: 'apiDesc',
        sortable: true,
        align: 'center'
    },
    {
        title: 'API參數',
        key: 'apiParam',
        sortable: true,
        align: 'center'
    },
    {
        title: 'API執行時間(毫秒)',
        key: 'apiExeTimeMs',
        sortable: true,
        align: 'center'
    },
    {
        title: '執行結果',
        key: 'success',
        sortable: true,
        align: 'center',
    },
    {
        title: '執行時間',
        key: 'executedAt',
        sortable: true,
        align: 'center'
    }
]