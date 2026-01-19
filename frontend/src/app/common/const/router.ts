// Отказываемся от enum тк он создает при билде бредятину по типу ()=>{}()

const ROUTER_PATH =  {
    main: '/',
    login: '/login',
    register: '/register',
} as const

export default ROUTER_PATH
