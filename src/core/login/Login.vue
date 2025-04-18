<template>
  <v-container fluid class="d-flex align-center justify-center h-screen pa-0  bg-primary">
    <v-responsive class="flex-1-1 px-4" max-width="520px">
      <v-img class="mx-auto mb-4" max-width="60" src="https://vuetifyjs.b-cdn.net/docs/images/logos/v.svg" contain />
      <div class="text-h5 text-center mb-6 font-weight-medium">人事差勤管理系統</div>
      <v-card class="pa-10 mb-8 elevation-3 rounded-lg" variant="elevated" :loading="isLoading">
        <v-text-field
            label="Email address"
            variant="outlined"
            class="mb-2"
            rounded
            v-model="formVModel.email"
            :error-messages="$v.email?.$errors.map((e: any) => e.$message)"
        ></v-text-field>
        <v-text-field
            label="Password"
            type="password"
            variant="outlined"
            class="mb-2"
            rounded
            v-model="formVModel.password"
            :error-messages="$v.password?.$errors.map((e: any) => e.$message)"
        ></v-text-field>
        <v-btn block class="bg-primary text-none" variant="elevated" @click="login" :loading="isLoading">Login</v-btn>
      </v-card>
    </v-responsive>
  </v-container>
</template>
<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {email, minLength, required} from "@/common/s-form/vuelidate";
import {useValidation} from "@/common/s-form/validations";
import {getAuthenticate, getPublicKey} from "@/core/login/account-api";
import AccountService from "@/core/login/account-service";
import {JSEncrypt} from "jsencrypt";
defineOptions({
  name: "login"
});

const isLoading = ref<boolean>(false); // 新增載入狀態

const accountService = inject<AccountService>('accountService');
const login = async () => {
  try {
    // 檢查表單的有效性
    if (!await checkValidity()) {
      return;
    }

    isLoading.value = true; // 開始載入

    const { headers: publicKeyHeader } = await getPublicKey()
    const publicKey = publicKeyHeader['publickey'] ?? '';

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);

    const request = {
      email: formVModel.email,
      password: String(encryptor.encrypt(formVModel.password))
    };

    // 獲取認證令牌
    const { headers: tokenHeader } = await getAuthenticate(request);
    const bearerToken = tokenHeader.authorization ?? '';

    // 如果有 bearer token，存入 sessionStorage
    if (bearerToken.startsWith('Bearer ')) {
      const jwt = bearerToken.substring(7);
      const key = accountService?.authenticationTokenKey;

      if (key) {
        sessionStorage.setItem(key, jwt);
        localStorage.removeItem(key);
      }
    }

    // 獲取帳戶資料並顯示成功通知
    await accountService?.retrieveAccount();

  } finally {
    // 結束載入
    isLoading.value = false;
  }
};

const form = {
  email: "t@gmail.com",
  password: "11111111",
}

const formVModel = reactive(form);

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(8) }
};

const {$v, checkValidity} = useValidation(rules, formVModel, form);
</script>