<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-banner
          class="mb-4"
          color="red darken-2"
          icon="mdi-alert"
          lines="one"
          max-width="800"
      >
        <v-banner-text>
          進入該打卡頁面10分鐘內未打卡，需要再重新進來一次，否則會打卡無效，請注意！
        </v-banner-text>
      </v-banner>
    </div>
    <div class="d-flex justify-center">
      <v-card elevation="8" rounded="lg" width="800" max-width="800">
        <div class="pa-2 d-flex justify-space-between">
          <div>
            <v-chip v-if="state.countdownSeconds > 0"
              color="primary">
              倒數：{{state.countdownSeconds}} 秒
            </v-chip>
            <v-chip
                v-else
                color="red"
            >
              請重新進入該頁面
            </v-chip>
          </div>
          <v-btn
            rounded="lg"
            size="small"
            variant="text"
            border
            class="text-center"
            @click="updateTime()"
          >同步時間按鈕</v-btn>
        </div>
        <div class="pa-6 px-12">
          <v-card-title class="text-h5 text-center">當前時間</v-card-title>
          <v-card-text class="text-center text-h3">{{ state.currentTime }}</v-card-text>
          <v-divider class="my-2"></v-divider>
          <div>
            <div class="d-flex align-center justify-center">
              <span class="mr-3 text-h6">驗證圖</span>
              <s-text-canvas :textContent="state.captcha"></s-text-canvas>
              <v-btn
                  color="secondary"
                  class="ma-5"
                  @click="changeCaptcha()"
              >更換</v-btn>
            </div>
            <v-otp-input
              length="6"
              :model-value="state.captchaInput"
              @update:model-value="val => state.captchaInput = val"
              :error="!isCaptchaValid"
            ></v-otp-input>
          </div>
          <div class="d-flex justify-center">
            <v-btn
                @click="clockIn()"
                color="primary"
                class="ma-5"
                size="x-large"
            >
              <font-awesome-icon :icon="['fas', 'up-long']" class="mr-2" />
              簽到
            </v-btn>
            <v-btn
                @click="clockOut()"
                color="primary"
                class="ma-5"
                size="x-large"
            >
              <font-awesome-icon :icon="['fas', 'down-long']" class="mr-2" />
              簽退
            </v-btn>
            <v-dialog v-model="state.isActiveSuccess" max-width="500">
              <template v-slot:default>
                <v-card title="打卡成功">
                  <div class="py-6 text-center">
                    <v-icon
                        color="success"
                        icon="mdi-check-circle-outline"
                        size="128"
                    ></v-icon>
                  </div>
                  <v-card-text class="text-h4 text-center">
                    {{state.activeTime}}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text="關閉"
                        @click="state.isActiveSuccess = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </v-card>
    </div>
  </v-container>

</template>
<script setup lang="ts">
import { onMounted, onUnmounted, defineAsyncComponent, computed, reactive } from 'vue'
import { randomFun, formatFun } from '@/common/fun/fun-main'
const STextCanvas = defineAsyncComponent(() => import('@/common/s-text-canvas/STextCanvas.vue'));
import { useAlert }from '@/common/s-alert/useSAlert'
defineOptions({
  name: "ss001w"
});

const state = reactive({
  currentTime: '',
  activeTime: '', //後端回傳的打卡時間
  isActiveSuccess: false,
  countdownSeconds: 10 * 60, //打卡無效前倒數
  captcha: '', //驗證碼
  captchaInput: '', //驗證碼輸入框
})
const isCaptchaValid = computed(() => state.captchaInput === state.captcha);

let currentTimeInterval: number
const updateTime = () => {
  state.currentTime = formatFun.formatTime(new Date())
}
let countdownInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  state.captcha = randomFun.generateRandomString(6,"number")
  updateTime()
  currentTimeInterval = window.setInterval(updateTime, 1000)

  countdownInterval = setInterval(() => {
    if (state.countdownSeconds > 0) {
      state.countdownSeconds--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
})

onUnmounted(() => {
  clearInterval(currentTimeInterval)
  clearInterval(countdownInterval);
})

// 上班卡按鈕處理
const clockIn = async () => {
  if(state.countdownSeconds <= 0){
    useAlert().error("請重新進入該畫面！");
    return;
  }
  if (!isCaptchaValid.value) {
    useAlert().error("請輸入正確驗證碼！");
    return;
  }
  try {
    // 模擬 API 請求
    console.log('打卡中...');
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模擬 1 秒 API 呼叫
    state.activeTime = new Date().toLocaleString()
    console.log('上班卡打卡成功！', new Date().toLocaleString())

    state.isActiveSuccess = true  // 成功後顯示 Dialog
  } catch (error) {
    console.error('打卡失敗', error)
  }

}

// 下班卡按鈕處理
const clockOut = () => {
  console.log('下班卡打卡成功！', new Date().toLocaleString())
}

const changeCaptcha = () => {
  state.captcha = randomFun.generateRandomString(6,"number")
  state.captchaInput = '';
}
</script>


