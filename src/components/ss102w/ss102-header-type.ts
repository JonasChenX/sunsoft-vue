import { STableHeaderType } from "@/common/s-table/s-table-type";

export const ss102TableHeader: STableHeaderType[] = [
    {
        title: '特休時數',
        key: 'annualLeave',
        sortable: false,
        align: 'center',
        children: [
            { title: '已用', value: 'annualLeaveUsed', align: 'center' },
            { title: '剩餘', value: 'annualLeaveRemaining', align: 'center' }
        ]
    },
    {
        title: '補休時數',
        key: 'compensatoryLeave',
        sortable: false,
        align: 'center',
        children: [
            { title: '已用', value: 'compensatoryLeaveUsed', align: 'center' },
            { title: '剩餘', value: 'compensatoryLeaveRemaining', align: 'center' }
        ]
    },
    {
        title: '已加班時數',
        key: 'overtimeHours',
        sortable: false,
        align: 'center'
    },
    {
        title: '已請事假時數',
        key: 'personalLeaveHours',
        sortable: false,
        align: 'center'
    },
    {
        title: '已請病假時數',
        key: 'sickLeaveHours',
        sortable: false,
        align: 'center'
    },
    {
        title: '已曠職時數',
        key: 'absenceHours',
        sortable: false,
        align: 'center'
    },
    {
        title: '已請假時數(其他)',
        key: 'otherLeaveHours',
        sortable: false,
        align: 'center'
    }
];


export const ss102TableHeaderB: STableHeaderType[] = [
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
        title: '請假/申請日期',
        key: 'leaveDate',
        sortable: true,
        align: 'center'
    },
    {
        title: '請假/申請時間',
        key: 'leaveTime',
        sortable: true,
        align: 'center',
        children: [
            { title: '起', value: 'leaveTimeStart', align: 'center' },
            { title: '迄', value: 'leaveTimeEnd', align: 'center' }
        ]
    },
    {
        title: '時數',
        key: 'hours',
        sortable: true,
        align: 'center'
    },
    {
        title: '事由',
        key: 'reason',
        sortable: false,
        align: 'left'
    }
]