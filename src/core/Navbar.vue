<template>
  <div class="fluid bg-secondary">
    <div class="d-flex pa-4 align-center">
        <a class="text-h5 text-primary" style="text-decoration: none;" href="/"> {{ PROJECT_NAME }} </a>
        <v-spacer></v-spacer>
        <v-menu v-for="(menu) in menus" :key="menu.id" offset-y>
          <template v-slot:activator="{ props }">
            <!-- 可直接跳頁按鈕 -->
            <template v-if="!menu.meta.directory && menu.path">
              <v-btn class="px-1 me-3" variant="text" @click="pathHandler(menu.path)">
                <font-awesome-icon v-if="menu.meta.icon" :icon="menu.meta.icon" class="ma-1" />
                  {{ menu.meta.label }}
              </v-btn>
            </template>
            <!-- 目錄 -->
            <template v-else>
              <v-btn v-bind="props"  class="px-1 me-3 border-b-md" variant="text">
                <font-awesome-icon v-if="menu.meta.icon" :icon="menu.meta.icon" class="ma-1" />
                {{ menu.meta.label }}
              </v-btn>
            </template>
          </template>
          <!-- 下拉項目 -->
          <template v-if="menu.meta.directory">
            <v-list>
              <v-list-item v-for="(children) in menu.children" :key="children.id" @click="pathHandler(children.path)">
                <div class="d-flex">
                  <font-awesome-icon v-if="children.meta.icon" :icon="children.meta.icon" class="ma-1 px-1" />
                  <v-list-item-title> {{ children.meta.label }} </v-list-item-title>
                </div>
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <span v-if="PROJECT_VERSION" class="me-5">版本: {{ PROJECT_VERSION }} </span>
          <v-btn color="primary" @click="logout"> 登出 </v-btn>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "navbar"
});

import { MenuItem } from "@/core/menu/menu";
import { getMenu } from '@/core/menu/menu-service'
const menus : MenuItem[] = getMenu();

import { useRouter } from 'vue-router';
const router = useRouter();
const pathHandler = (path: string) => {
  router.push(path);
};

const PROJECT_NAME : string = import.meta.env.VITE_PROJECT_NAME;
const PROJECT_VERSION : string = import.meta.env.VITE_PROJECT_VERSION;

const logout = () => {
  console.log('登出');
};
</script>

