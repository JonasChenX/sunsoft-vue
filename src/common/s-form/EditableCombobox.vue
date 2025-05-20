<template>
  <div>
    <div class="text-subtitle-1 text-medium-emphasis">{{ label }}</div>
    <v-combobox
        density="compact"
        :model-value="modelValue"
        v-model:search="search"
        :custom-filter="queryFilterByCheckboxM(optionItems, modelValue)"
        :items="optionItems"
        item-value="title"
        variant="outlined"
        hide-selected
        multiple
        :readonly="readonly"
        @update:modelValue="handleModelUpdate($event)"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :error-messages="errorMessages"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip
            v-if="item === Object(item)"
            :text="item.title"
            size="small"
            variant="flat"
            closable
            label
            @click:close="removeSelection(index)"
        />
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item v-if="item.raw.header && search">
          <span class="mr-3">Create</span>
          <v-chip
              size="small"
              variant="flat"
              label
          >
            {{ search }}
          </v-chip>
        </v-list-item>

        <v-list-subheader
            v-else-if="item.raw.header"
            :title="item.title"
        ></v-list-subheader>

        <v-list-item v-else @click="handleItemClick(props, item.raw)">
          <v-text-field
              v-if="editingItem === item.raw"
              v-model="editingItem['title']"
              bg-color="transparent"
              class="mr-3"
              density="compact"
              variant="plain"
              autofocus
              hide-details
              @click.stop
              @keydown.stop
              @keyup.enter="editItem(item.raw)"
          ></v-text-field>

          <v-chip
              v-else
              :text="item.raw.title"
              variant="flat"
              label
              size="small"
          ></v-chip>

          <template v-slot:append>
            <v-btn
                v-if="editingItem === item.raw"
                color="red"
                icon="mdi-delete"
                size="small"
                variant="text"
                @click.stop.prevent="removeOptionItem(item.raw)"
            ></v-btn>
            <v-btn
                :color="editingItem !== item.raw ? 'primary' : 'success'"
                :icon="editingItem !== item.raw ? 'mdi-pencil' : 'mdi-check'"
                size="small"
                variant="text"
                @click.stop.prevent="editItem(item.raw)"
            ></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-combobox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { arrayFun, strChangFun } from '@/common/fun/fun-main';
import { SFormItemOption } from '@/common/s-form/s-form-type';

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
  items: {
    type: Array as () => SFormItemOption[],
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'blur', 'change']);

const search = ref('');
const editingItem = ref<SFormItemOption | null>(null);

// 使用 computed 屬性來處理 items，以便在內部修改
const optionItems = ref<SFormItemOption[]>(JSON.parse(JSON.stringify(props.items)));

const handleModelUpdate = (newValue: string[]) => {
  if (!Array.isArray(newValue)) {
    emit('update:modelValue', []);
    return;
  }

  const updatedItems = [...optionItems.value];
  const processedValue = newValue.map(v => {
    if (typeof v === 'string') {
      const existingItem = updatedItems.find(item => !item.header && item.title === v);
      if (existingItem) {
        return existingItem;
      }
      const newItem: SFormItemOption = { title: v };
      updatedItems.push(newItem);
      return newItem;
    }
    return v;
  });

  optionItems.value = arrayFun.deduplicateByKeys(updatedItems, "title");
  emit('update:modelValue', processedValue.map(item => item.title));
};

const editItem = (item: SFormItemOption) => {
  if (!optionItems.value) {
    return;
  }
  const isEditing = editingItem.value === item;
  if (isEditing) {
    const newTitle = item.title?.trim();
    const allTitles = optionItems.value.map(opt => opt.title);
    const duplicateCount = allTitles.filter(title => title === newTitle).length;

    if (duplicateCount > 1) {
      return;
    }
    editingItem.value = null;
  } else {
    editingItem.value = item;
  }
};

const queryFilterByCheckboxM = (items: SFormItemOption[], model: string[]) => {
  return (value: string, queryText: string, item: any): boolean => {
    const query = strChangFun.toLowerCaseString(queryText);
    const availableOptions = items.filter(x => !model.includes(x.title as string));
    const hasAnyMatch = availableOptions.some(
        x => !x.header && x.title && strChangFun.toLowerCaseString(x.title).includes(query)
    );
    // 確保 item.raw 存在且是 SFormItemOption 類型
    if (item.raw && item.raw.header) return !hasAnyMatch;
    const text = strChangFun.toLowerCaseString(item.raw.title as string);
    return text.includes(query);
  };
};

const removeSelection = (index: number) => {
  const newModelValue = [...props.modelValue];
  newModelValue.splice(index, 1);
  emit('update:modelValue', newModelValue);
};

const removeOptionItem = (item: SFormItemOption) => {
  optionItems.value = optionItems.value.filter(opt => opt !== item);
  if (editingItem.value === item) {
    editingItem.value = null;
  }
  // 同步更新 modelValue，移除被刪除的選項
  const newModelValue = props.modelValue.filter(val => val !== item.title);
  emit('update:modelValue', newModelValue);
};

const handleItemClick = (props: { onClick: () => void }, item: SFormItemOption) => {
  if(editingItem.value){
    console.log("正在編輯，跳過點擊");
    return;
  }
  props.onClick();
};
</script>