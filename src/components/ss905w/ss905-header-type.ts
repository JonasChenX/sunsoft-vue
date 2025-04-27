import { STableHeaderType } from "@/common/s-table/s-table-type";

//序號 登入帳號 登入IP 登入結果 登入時間
export const ss905TableHeader : STableHeaderType[] = [
    {
        title: '序號',
        key: 'indexId',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '檔案名稱',
        key: 'fileName',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '檔案大小',
        key: 'fileSize',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '最後修改時間',
        key: 'lastModifiedTime',
        sortable: true,
        align: 'center',
        visibleByRemove: false
    },
    {
        title: '下載檔案',
        key: 'id',
        sortable: true,
        align: 'center',
        visibleByRemove: true
    }
]