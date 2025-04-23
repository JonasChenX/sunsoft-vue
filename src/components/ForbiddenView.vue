<template>
  <div class="border-lg rounded pa-10 ma-2 text-error">
    <div class="text-h4 text-center">
      無權限使用, 請勿直接在URL上切換頁面
    </div>
    <div class="text-h4 text-center mt-3">
      <span class="text-black"> {{ userName }} </span>
      不要偷偷亂來
    </div>
  </div>
</template>
<script setup lang="ts">
import {useAccountStore} from "@/store/account-store";
const accountStore = useAccountStore();
const userName = accountStore.getAccount?.userName
</script>

