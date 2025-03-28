<template>
  <component :is="loginView"></component>
</template>
<script setup lang="ts">
import AccountService from "@/core/login/account-service";
import {inject, onMounted, shallowRef} from "vue";
import {useAccountStore} from "@/store/account-store";
import ProdLoginForm from './PropLogin.vue';
import DevLoginForm from './DevLogin.vue';
import {useAppStateStore} from "@/store/app-state-store";
const loginView = shallowRef<typeof ProdLoginForm | typeof DevLoginForm | null>(null);

const accountStore = useAccountStore();
const appStateStore = useAppStateStore();

onMounted(() => {

  const accountService = inject<AccountService>('accountService');
  if(!accountService){
    loginView.value = ProdLoginForm;
    return;
  }
  appStateStore.viewLoadingStart()
  accountService.retrieveProfiles().then(() => {
    const activeProfiles: string = accountStore.getActiveProfiles || "";
    if(activeProfiles == "dev"){
      loginView.value = DevLoginForm;
      return
    }
    loginView.value = ProdLoginForm;
  }).finally(() => {
    appStateStore.viewLoadingEnd()
  });
})
</script>
