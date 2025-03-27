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

  <!-- 畫面載入警示 -->
  <v-dialog
      v-model="isViewLoading"
      max-width="280"
      persistent
  >
    <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
    >
      <v-list-item
          title="畫面載入中請稍後..."
      >
        <template v-slot:append>
          <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue';
import { useRoute } from "vue-router";
import {useAppStateStore} from "@/store/app-state-store";
const Navbar = defineAsyncComponent(() => import('@/core/Navbar.vue'));
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
const appStateStore = useAppStateStore();
const isViewLoading = computed(() => appStateStore.isViewLoading);

</script>