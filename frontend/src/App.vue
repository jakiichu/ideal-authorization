<script setup lang="ts">

import {useAuthStore} from "@/app/modules/user/store";
import {onMounted} from "vue";

const store = useAuthStore()

onMounted(() => {
  store.getMe()
})
</script>
<template>
  <router-view class="view header" name="header"/>
  <router-view class="view default" name="default"/>
</template>
