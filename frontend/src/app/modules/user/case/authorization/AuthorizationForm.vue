<script setup lang="ts">
import ROUTER_PATH from "@/app/common/const/router.ts";
import AuthForm from "@/app/modules/user/form/AuthForm.vue";
import type {IUserForm} from "@/domain/user/interface/form.ts";
import {useAuthStore} from "@/app/modules/user/store";
import {useRouter} from "vue-router";

const store = useAuthStore()
const router = useRouter()

const initialForm = store.cacheUserData as IUserForm

const handleSubmit = (form: IUserForm): void => {
  store.login({...form}, {
        onSuccess: async () => {
          await router.push({path: ROUTER_PATH.main})
        }
      }
  )
}
</script>


<template>
  <AuthForm button-name="Войти" @email="initialForm.email" @password="initialForm.password"
            @submit="handleSubmit"></AuthForm>
  <p>Еще не зарегестрированы?
    <RouterLink :to="ROUTER_PATH.register" class="text-blue-800">Зарегистрироваться</RouterLink>
    .
  </p>
</template>

