const SS101 = () => import('@/components/ss101w/Ss101w.vue')
const SS102 = () => import('@/components/ss102w/Ss102w.vue')
const SS103 = () => import('@/components/ss103w/Ss103w.vue')
const SS104 = () => import('@/components/ss104w/Ss104w.vue')
const SS105 = () => import('@/components/ss105w/Ss105w.vue')

export default [
    {
        name: 'ss101',
        path: '/ss101',
        component: SS101,
        meta: {
            functionId: 'SS101',
            label: '申請紀錄查詢(特休/請假/加班)',
            requiresAuth: true
        },
    },
    {
        name: 'ss102',
        path: '/ss102',
        component: SS102,
        meta: {
            functionId: 'SS102',
            label: '出勤時數查詢',
            requiresAuth: true
        },
    },
    {
        name: 'ss103',
        path: '/ss103',
        component: SS103,
        meta: {
            functionId: 'SS103',
            label: '打卡紀錄查詢',
            requiresAuth: true
        },
    },
    {
        name: 'ss104',
        path: '/ss104',
        component: SS104,
        meta: {
            functionId: 'SS104',
            label: '基本資料查詢',
            requiresAuth: true
        },
    },
    {
        name: 'ss105',
        path: '/ss105',
        component: SS105,
        meta: {
            functionId: 'SS105',
            label: '修改密碼',
            requiresAuth: true
        },
    }
]