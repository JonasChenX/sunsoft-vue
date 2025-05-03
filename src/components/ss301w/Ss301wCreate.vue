<template>
  <s-btn-group
      :f6-enabled="true"
      f6-label="返回查詢頁"
      @f6="toQueryView"
  ></s-btn-group>
  <div class="mx-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">新增員工</div>
      <v-stepper
          ref="stepperRef"
          hide-actions
          v-model="step"
          :items="steps"
      >
        <v-stepper-window>
          <v-stepper-window-item :value="1">
            <s-form
              ref="sFormStep1Ref"
              :formConfig="formConfigStep1"
            ></s-form>
          </v-stepper-window-item>

          <v-stepper-window-item :value="2">
            <s-form
                ref="sFormStep2Ref"
                :formConfig="formConfigStep2"
            ></s-form>
          </v-stepper-window-item>

          <v-stepper-window-item :value="3">
            <s-form
                ref="sFormStep3Ref"
                :formConfig="formConfigStep3"
            ></s-form>
          </v-stepper-window-item>

          <v-stepper-window-item :value="4">
            <ss301w-create-step4-view
              ref="sFormStep4Ref"
            />
          </v-stepper-window-item>

          <v-stepper-window-item :value="5">
            <div>這是第 5 步 - 完成</div>
          </v-stepper-window-item>
        </v-stepper-window>
        <v-stepper-actions>
          <template #prev>
            <v-btn text="上一步" :disabled="step === 1" @click="step--" />
          </template>

          <template #next>
            <!-- 如果是最後一步，顯示「完成送出」 -->
            <v-btn v-if="step === steps.length" :disabled="false" text="完成送出" @click="submit" />
            <!-- 否則顯示「下一步」 -->
            <v-btn v-else text="下一步" @click="nextStep" />
          </template>
        </v-stepper-actions>
      </v-stepper>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, defineAsyncComponent} from "vue";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import {
    ss301CreateStep1FormConfig,
    ss301CreateStep2FormConfig,
    ss301CreateStep3FormConfig, ss301CreateStep4FormConfig
} from "@/components/ss301w/ss301-form-config";
import Ss301wCreateStep4View from "@/components/ss301w/ss301wCreateStep4View.vue";
const ss301wCreateStep4View = defineAsyncComponent(() => import('./ss301wCreateStep4View.vue'));

defineOptions({
  name: "ss301w-create"
});

// 切換到新增員工頁面
const emit = defineEmits<{
  (e: 'switchComponent', componentName: string): void;
}>();
const toQueryView = () => {
  emit('switchComponent', 'Ss301wQuery');
}

const formConfigStep1 : SFormConfig = reactive<any>(ss301CreateStep1FormConfig)
const formConfigStep2 : SFormConfig = reactive<any>(ss301CreateStep2FormConfig)
const formConfigStep3 : SFormConfig = reactive<any>(ss301CreateStep3FormConfig)

const step = ref<number>(4)


const steps = reactive([
  {
    title: '基本資料',
    step: 1,
  },
  {
    title: '詳細資料',
    step: 2,
  },
  {
    title: '技術能力',
    step: 3,
  },
  {
    title: '工作經驗',
    step: 4,
  },
  {
    title: '確認送出',
    step: 5,
  },
])
// 抓到 <v-stepper> 元件的引用
const stepperRef = ref()
const sFormStep1Ref = ref<SFormFunction | null>(null)
const sFormStep2Ref = ref<SFormFunction | null>(null)
const sFormStep3Ref = ref<SFormFunction | null>(null)
const sFormStep4Ref = ref<SFormFunction | null>(null)

// 點下一步時驗證表單
const nextStep = async () => {
  //判斷目前在哪一個step
  switch (step.value) {
    case 1:
      //驗證表單
      const getFormDataStep1 = await sFormStep1Ref.value!.getFormData()
      if (!getFormDataStep1) {
        // return
      }
      //TODO 打API確認信箱是否重複(有代表已申請過)
      stepperRef.value?.next()
      break
    case 2:
      //驗證表單
      const getFormDataStep2 = await sFormStep2Ref.value!.getFormData()
      if (!getFormDataStep2) {
        // return
      }
      stepperRef.value?.next()
      break
    case 3:
      //驗證表單
      const getFormDataStep3 = await sFormStep3Ref.value!.getFormData()
      if (!getFormDataStep3) {
        // return
      }
      stepperRef.value?.next()
      break
    case 4:
        //驗證表單
        const getFormDataStep4 = await sFormStep4Ref.value!.getFormData()
        if (!getFormDataStep4) {
            // return
        }
        stepperRef.value?.next()
      break
    default:
      break
  }
}

const submit = () => {
  console.log('Submit form')
}

</script>