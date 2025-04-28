const SS301 = () => import('@/components/ss301w/Ss301w.vue')

export default [
    {
        name: 'ss301',
        path: '/ss301',
        component: SS301,
        meta: {
            functionId: 'SS301',
            label: '員工基本資料管理',
            requiresAuth: true
        }
    }
]