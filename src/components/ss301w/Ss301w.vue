<template>
  <component
    :is="curComName"
    @switchComponent="switchComponent"
  ></component>
</template>
<script setup lang="ts">
import {defineAsyncComponent, markRaw, ref} from "vue";
// 使用 markRaw 來避免將組件變為響應式
const Ss301wQuery = markRaw(defineAsyncComponent(() => import('./Ss301wQuery.vue')));
const Ss301wCreate = markRaw(defineAsyncComponent(() => import('./Ss301wCreate.vue')));
defineOptions({
  name: "ss301w"
});
//預設查詢頁面
const curComName = ref(Ss301wQuery);

const componentsMap: Record<string, any> = {
  Ss301wQuery,
  Ss301wCreate
};

// 用來切換顯示的組件
const switchComponent = (componentName: string) => {
  const component = componentsMap[componentName];
  if (component) {
    curComName.value = component;
  }
}
</script>