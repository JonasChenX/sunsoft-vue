const SS902 = () => import('@/components/ss902w/Ss902w.vue')
const SS903 = () => import('@/components/ss903w/Ss903w.vue')
const SS904 = () => import('@/components/ss904w/Ss904w.vue')
const SS905 = () => import('@/components/ss905w/Ss905w.vue')

export default [
    {
        name: 'ss902',
        path: '/ss902',
        component: SS902,
        meta: {
            functionId: 'SS902',
            label: '登入紀錄查看',
            requiresAuth: true
        },
    },
    {
        name: 'ss903',
        path: '/ss903',
        component: SS903,
        meta: {
            functionId: 'SS903',
            label: '功能面頁跳轉紀錄查看',
            requiresAuth: true
        },
    },
    {
        name: 'ss904',
        path: '/ss904',
        component: SS904,
        meta: {
            functionId: 'SS904',
            label: '功能API執行紀錄查看',
            requiresAuth: true
        },
    },
    {
        name: 'ss905',
        path: '/ss905',
        component: SS905,
        meta: {
            functionId: 'SS905',
            label: '系統日誌查看',
            requiresAuth: true
        },
    }
]