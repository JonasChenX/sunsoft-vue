<template>
  <Navbar></Navbar>
  <router-view/>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('@/core/Navbar.vue'));
</script>