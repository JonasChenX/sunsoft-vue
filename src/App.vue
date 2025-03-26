<template>
  <template v-if="!isLoginPage">
    <Navbar></Navbar>
  </template>
  <router-view/>
  <notifications
      group="exe-notify"
      position="bottom right"
      :max="1"
  />
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue';
import { useRoute } from "vue-router";
const Navbar = defineAsyncComponent(() => import('@/core/Navbar.vue'));
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>