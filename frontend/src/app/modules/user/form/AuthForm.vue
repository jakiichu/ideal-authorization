<script setup lang="ts">

import {reactive} from "vue";
import type {IUserForm} from "@/domain/user/interface/form.ts";

const props = defineProps({
  buttonName: String,
  email: String,
  password: String,
})

const emit = defineEmits(['submit'])

const form = reactive<IUserForm>({
  email: props.email || "",
  password: props.password || ""
})

const handleSubmit = async (): Promise<void> => {
  emit("submit", form);
}
</script>


<template>
  <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
    <input type="text" v-model="form.email" class="ring-1 ring-black rounded-lg p-1.5"/>
    <input type="password" v-model="form.password" class="ring-1 ring-black rounded-lg p-1.5"/>
    <button type="submit" class="cursor-pointer">{{ props.buttonName }}</button>
  </form>
</template>
