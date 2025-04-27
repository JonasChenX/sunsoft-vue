const SS902 = () => import('@/components/ss902w/Ss902w.vue')
const SS903 = () => import('@/components/ss903w/Ss903w.vue')

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
    }
]