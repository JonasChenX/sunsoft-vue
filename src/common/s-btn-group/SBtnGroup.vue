<template>
  <div>
    <v-container class="d-flex justify-center">
      <v-btn-group
          variant="flat"
          rounded="3"
          density="compact"
      >
        <v-btn height="30" class="me-1" color="primary" id="f1" v-s-shortcut.global="'f1'" @click="handler" :disabled="!props.f1Enabled">
          <kbd>F1</kbd>
          {{ f1Label }}
        </v-btn>
        <v-btn height="30" class="me-1" color="primary" id="f2" v-s-shortcut.global="'f2'" @click="handler" :disabled="!props.f2Enabled">
          <kbd>F2</kbd>
          {{ f2Label }}
        </v-btn>
        <v-btn height="30" class="me-1" color="primary" id="f3" v-s-shortcut.global="'f3'" @click="handler" :disabled="!props.f3Enabled">
          <kbd>F3</kbd>
          {{ f3Label }}
        </v-btn>
        <v-btn height="30" class="me-1" color="primary" id="f4" v-s-shortcut.global="'f4'" @click="handler" :disabled="!props.f4Enabled">
          <kbd>F4</kbd>
          {{ f4Label }}
        </v-btn>
        <v-btn height="30" class="me-1" color="primary" id="f5" v-s-shortcut.global="'f5'" @click="handler" :disabled="!props.f5Enabled">
          <kbd>F5</kbd>
          {{ f5Label }}
        </v-btn>
        <v-btn height="30" color="primary" id="f6" v-s-shortcut.global="'f6'" @click="handler" :disabled="!props.f6Enabled">
          <kbd>F6</kbd>
          {{ f6Label }}
        </v-btn>
      </v-btn-group>
    </v-container>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "s-btn-group"
});

const props = defineProps({
  f1Label: { type: String, default: '新增' },
  f2Label: { type: String, default: '修改' },
  f3Label: { type: String, default: '刪除' },
  f4Label: { type: String, default: '查詢' },
  f5Label: { type: String, default: '清除' },
  f6Label: { type: String, default: '返回' },
  f1Enabled: { type: Boolean, default: false },
  f2Enabled: { type: Boolean, default: false },
  f3Enabled: { type: Boolean, default: false },
  f4Enabled: { type: Boolean, default: false },
  f5Enabled: { type: Boolean, default: false },
  f6Enabled: { type: Boolean, default: false }
});

// emits，這裡列出所有你要用的事件
const emit = defineEmits<{
  (e: 'f1'): void;
  (e: 'f2'): void;
  (e: 'f3'): void;
  (e: 'f4'): void;
  (e: 'f5'): void;
  (e: 'f6'): void;
}>();

const handler = (event: Event) => {
  const target = event.target as HTMLElement;
  const id = target.closest('[id]')?.id;
  if (id) {
    const eventName = id.toLowerCase(); // 例如 f1, f2...
    // 確認是不是你允許的事件名稱
    if (['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].includes(eventName)) {
      emit(eventName as any); // 發送事件
    }
  }
};
</script>
<style scoped>
kbd {
  display: inline-block;
  padding: 0.25rem;
  margin: 0;
}
</style>


