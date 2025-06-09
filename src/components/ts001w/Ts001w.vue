<template>
  <v-container>
    <v-card
      variant="outlined"
    >
      <v-card-title>
        <div>發送Email</div>
      </v-card-title>
      <v-card-subtitle>
        <div>測試發送Email是否成功收到</div>
      </v-card-subtitle>
      <v-card-actions class="d-flex">
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="sendMail" :loading="state.isLoading">執行</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import {reactive} from "vue";
defineOptions({
  name: "Test" // 更具描述性的組件名稱
});

const state = reactive({
  isLoading: false,
});

const sendMail = () => {
  state.isLoading = true
  axios.get('/sunsoft/api/ts001/sendMail').then(()=>{
    console.log("測試組件事件觸發成功");
  }).catch((error) => {
    console.error("測試組件事件觸發失敗:", error);
  }).finally(() => {
    state.isLoading = false
  });
}
</script>
