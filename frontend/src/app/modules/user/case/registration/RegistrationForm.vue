<script setup lang="ts">
import ROUTER_PATH from "@/app/common/const/router.ts";
import AuthForm from "@/app/modules/user/form/AuthForm.vue";
import type {IUserForm} from "@/domain/user/interface/form.ts";
import {useAuthStore} from "@/app/modules/user/store";
import {useRouter} from "vue-router";

const initialForm = {
  email: "",
  password: "",
} as IUserForm
const router = useRouter()

const store = useAuthStore()

const handleSubmit = (form: IUserForm): void => {
  store.registration({...form}, {
    onSuccess: async () => {
      await router.push({path: ROUTER_PATH.login})
    }
  })
}
</script>


<template>
  <AuthForm button-name="Зарегистрироваться" @email="initialForm.email" @password="initialForm.password"
            @submit="handleSubmit"/>
  <p>уже зарегестрированы?
    <RouterLink :to="ROUTER_PATH.login" class="text-blue-800">Авторизироваться</RouterLink>
    .
  </p>
</template>

