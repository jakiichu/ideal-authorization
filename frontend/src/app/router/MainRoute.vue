<script setup>
import ROUTER_PATH from "@/app/common/const/router.ts";
import {useAuthStore} from "@/app/modules/user/store/index.ts";

const store = useAuthStore()
</script>

<template>
  <div>
    MainRoute.vue
    <RouterLink :to='ROUTER_PATH.login'>Авторизация</RouterLink>

    <div v-if="store.userData!==null">id пользователя: {{ store.userData.id }}</div>

  </div>
</template>
