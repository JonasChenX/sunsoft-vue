const SS902 = () => import('@/components/ss902w/Ss902w.vue')

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
    }
]