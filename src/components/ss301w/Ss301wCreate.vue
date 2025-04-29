<template>
  <s-btn-group
      :f1-enabled="true"
      :f6-enabled="true"
      f6-label="返回查詢頁"
      @f6="toQueryView"
  ></s-btn-group>
  <div class="mx-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">新增員工</div>
    </v-container>
  </div>
</template>
<script setup lang="ts">
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
</script>