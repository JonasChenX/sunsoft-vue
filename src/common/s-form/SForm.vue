<template>
  <v-form>
    <v-row no-gutters>
      <v-col
        cols="12"
        :md="formItem.isFull ? 12 : 6 "
        class="px-1"
        v-for="(formItem, index) in formAttributes" :key="index"
      >

        <!-- 雙列表複選 -->
        <template v-if="formItem.type == 'dualListBox'">
          <dual-list-box
            :title="formItem.label"
            :source="formItem.optionItem"
            v-model="formData[formItem.modelName]"
            label="title"
            itemKey="value"
            valueKey="value"
            :is-disabled="false"
            :readonly="isReadOnly"
            @blur="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></dual-list-box>
        </template>

        <!-- input - 文字 -->
        <template v-if="formItem.type == 'inputText'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-text-field
            density="compact"
            :counter="formItem.maxLen || false"
            :placeholder="formItem.placeholder"
            variant="outlined"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-text-field>
        </template>

        <!-- input - 隱碼文字 -->
        <template v-if="formItem.type == 'inputPwd'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-text-field
              density="compact"
              autocomplete="password"
              :counter="formItem.maxLen || false"
              :placeholder="formItem.placeholder"
              variant="outlined"
              v-model="formData[formItem.modelName]"
              :append-inner-icon="!isReadOnly && formItem.visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="formItem.visible ? 'text' : 'password'"
              :readonly="isReadOnly"
              @click:append-inner="formItem.visible = !formItem.visible"
              @blur="$v[formItem.modelName]?.$touch"
              @input="$v[formItem.modelName]?.$touch"
              :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-text-field>
        </template>

        <!-- input - 日期YYYYMMDD -->
        <template v-if="formItem.type == 'inputDate'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-text-field
            density="compact"
            type="date"
            variant="outlined"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-text-field>
        </template>

        <!-- input - 日期YYYYMM -->
        <template v-if="formItem.type == 'inputDateM'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-text-field
            density="compact"
            type="month"
            variant="outlined"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-text-field>
        </template>

        <!-- 下拉選單(單選) -->
        <template v-if="formItem.type == 'select'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-select
            density="compact"
            :items="formItem.optionItem"
            variant="outlined"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-select>
        </template>

        <!-- 下拉選單(複選) -->
        <template v-if="formItem.type == 'selectM'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-select
            v-model="formData[formItem.modelName]"
            :items="formItem.optionItem"
            chips
            multiple
            density="compact"
            variant="outlined"
            :readonly="isReadOnly"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-select>
        </template>

        <!-- ckeckbox -->
        <template v-if="formItem.type == 'checkbox'">
          <v-textarea
            v-if="formItem.textAreaContent"
            clearable
            density="compact"
            :value="formItem.textAreaContent"
            variant="outlined"
            auto-grow
            hide-details
            readonly
            rows="3"
          ></v-textarea>
          <v-checkbox
            v-model="formData[formItem.modelName]"
            :label="formItem.label"
            density="compact"
            :readonly="isReadOnly"
            @blur="$v[formItem.modelName]?.$touch"
            @change="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-checkbox>
        </template>

        <!-- checkbox(可添加項目複選) -->
        <template v-if="formItem.type == 'checkboxM'">
          <editable-combobox
              :label="formItem.label"
              v-model="formData[formItem.modelName]"
              :items="formItem.optionItem"
              :readonly="isReadOnly"
              @blur="$v[formItem.modelName]?.$touch"
              @change="$v[formItem.modelName]?.$touch"
              :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></editable-combobox>
        </template>

        <!-- 檔案 -->
        <template v-if="formItem.type == 'inputFile'">
          <v-file-input
            density="compact"
            :label="formItem.label"
            show-size
            chips
            :accept="formItem.accept"
            counter
            variant="outlined"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-file-input>
        </template>

        <!-- 文字框 -->
        <template v-if="formItem.type == 'textArea'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-textarea
            :clearable="isReadOnly? false : true"
            density="compact"
            variant="outlined"
            auto-grow
            :rows="formItem.rows"
            :readonly="isReadOnly"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-textarea>
        </template>

        <!-- 拉條 -->
        <template v-if="formItem.type == 'slider'">
          <v-slider
            :label="formItem.label"
            v-model="formData[formItem.modelName]"
            :max="Object.keys(formItem.ticksItem as Record<string, string>).length - 1"
            :ticks="formItem.ticksItem"
            show-ticks="always"
            step="1"
            tick-size="4"
            :readonly="isReadOnly"
            @change="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-slider>
        </template>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent, onMounted, reactive, ref} from "vue";
import { useValidation } from '@/common/s-form/validations'
import {
    SFormGroupsItemInitType,
    SFormGroupsItemType,
    SFormValidation
} from "@/common/s-form/s-form-type";
const DualListBox = defineAsyncComponent(() => import('./DualListBox.vue'));
const EditableCombobox = defineAsyncComponent(() => import('./EditableCombobox.vue')); // 確保路徑正確

defineOptions({
  name: "s-form"
});
const props = defineProps({
  formConfig:{
    type: Object,
    required: true
  },
  isReadOnly: {
    type: Boolean,
    default: false
  }
})

//綁定值
const formData = reactive({ ...props.formConfig.formModel });
//表單顯示物件初始化
const formAttributes = ref<SFormGroupsItemInitType[]>([]);

onMounted(()=>{
  formAttributes.value = init(props.formConfig.groups)
})

const init = (groups: SFormGroupsItemType[]): SFormGroupsItemInitType[] => {
  if (!Array.isArray(groups)) return [];
  return groups.map(group => ({
    type: group.type,
    label: group.label,
    isFull: group.isFull || false,
    modelName: group.modelName,
    maxLen: group.maxLen,
    placeholder: group.placeholder,
    textAreaContent: group.textAreaContent,
    optionItem: group.optionItem ? JSON.parse(JSON.stringify(group.optionItem)) : null,
    ticksItem: group.ticksItem,
    accept: group.accept,
    rows: group.rows,
    validation: group.validation,
    visible: false
  }));
}

//驗證規則初始化
const validationRules = computed(() => {
  const rules: Record<string, SFormValidation> = {};
  if (!Array.isArray(props.formConfig.groups)) return rules;
  props.formConfig.groups.forEach(group => {
    if (group.validation) {
      rules[group.modelName] = group.validation;
    }
  });
  return rules;
});

const {$v, checkValidity} = useValidation(validationRules, formData, props.formConfig.formModel)

const getFormData = async () => {
  if(!await checkValidity()){
    return null;
  }
  return Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? null : value])
  );
}
defineExpose({
  getFormData
});
</script>
