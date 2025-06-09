const TS001 = () => import('@/components/ts001w/Ts001w.vue')

export default [
    {
        name: 'ts001',
        path: '/ts001',
        component: TS001,
        meta: {
            functionId: 'TS001',
            label: '後端執行按鈕群組',
            requiresAuth: true
        },
    }
]