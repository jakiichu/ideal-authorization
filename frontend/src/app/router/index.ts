import {createRouter, createWebHistory} from 'vue-router'
import AuthRoute from "@/app/router/AuthRoute.vue";
import RegistrationRoute from "@/app/router/RegistrationRoute.vue";
import MainRoute from "@/app/router/MainRoute.vue";
import ROUTER_PATH from "@/app/common/const/router.ts";


const routes = [
    {path: ROUTER_PATH.main, component: MainRoute},
    {path: ROUTER_PATH.login, component: AuthRoute},
    {path: ROUTER_PATH.register, component: RegistrationRoute},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export {router}
