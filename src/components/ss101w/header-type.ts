import { STableHeaderType } from "@/common/s-table/s-table-type";

//類型 種類 請假時間起 請假時間迄 時數 審核狀態 審核人員 發送時間 最後更新時間 事由 退件原因
export const ss101TableHeader : STableHeaderType[] = [
    {
        title: '類型',
        key: 'type',
        sortable: true,
        align: 'center'
    },
    {
        title: '種類',
        key: 'category',
        sortable: true,
        align: 'center'
    },
    {
        title: '請假時間',
        key: 'leaveStartTime',
        sortable: false,
        align: 'center',
        children: [
            { title: '起', value: 'leaveStartTime', align: 'center' },
            { title: '迄', value: 'leaveEndTime', align: 'center' }
        ]
    },
    {
        title: '時數',
        key: 'hours',
        sortable: true,
        align: 'center',
    },
    {
        title: '審核狀態',
        key: 'approvalStatus',
        sortable: true,
        align: 'center'
    },
    {
        title: '審核人員',
        key: 'approver',
        sortable: true,
        align: 'center'
    },
    {
        title: '發送時間',
        key: 'sendTime',
        sortable: false,
        align: 'center'
    },
    {
        title: '最後更新時間',
        key: 'lastUpdatedTime',
        sortable: false,
        align: 'center'
    },
    {
        title: '事由',
        key: 'reason',
        sortable: false,
        align: 'center'
    },
    {
        title: '退件原因',
        key: 'rejectionReason',
        sortable: false,
        align: 'center'
    }
]