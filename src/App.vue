<template>
  <template v-if="!isLoginPage">
    <Navbar></Navbar>
  </template>
  <router-view/>
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue';
import { useRoute } from "vue-router";
const Navbar = defineAsyncComponent(() => import('@/core/Navbar.vue'));
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>