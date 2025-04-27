<template>
  <v-form>
    <v-row no-gutters>
      <v-col
        cols="12"
        :md="formItem.isFull ? 12 : 6 "
        class="px-1"
        v-for="(formItem, index) in formAttributes" :key="index"
      >
        <!-- input - 文字 -->
        <template v-if="formItem.type == 'inputText'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
          <v-text-field
            density="compact"
            :counter="formItem.maxLen || false"
            :placeholder="formItem.placeholder"
            variant="outlined"
            v-model="formData[formItem.modelName]"
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
            @blur="$v[formItem.modelName]?.$touch"
            @change="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-checkbox>
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
            clearable
            density="compact"
            variant="outlined"
            auto-grow
            :rows="formItem.rows"
            v-model="formData[formItem.modelName]"
            @blur="$v[formItem.modelName]?.$touch"
            @input="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-textarea>
        </template>

        <template v-if="formItem.type == 'slider'">
          <!-- 拉條 -->
          <v-slider
            :label="formItem.label"
            v-model="formData[formItem.modelName]"
            :max="Object.keys(formItem.ticksItem as Record<string, string>).length - 1"
            :ticks="formItem.ticksItem"
            show-ticks="always"
            step="1"
            tick-size="4"
            @change="$v[formItem.modelName]?.$touch"
            :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
          ></v-slider>
        </template>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import { useValidation } from '@/common/s-form/validations'
import {SFormGroupsItemType, SFormValidation} from "@/common/s-form/s-form-type";
defineOptions({
  name: "s-form"
});
const props = defineProps({
  formConfig:{
    type: Object,
    required: true
  }
})

//綁定值
const formData = reactive({ ...props.formConfig.formModel });
//表單顯示物件初始化
const formAttributes = ref<SFormGroupsItemType[]>([]);

onMounted(()=>{
  formAttributes.value = init(props.formConfig.groups)
})

const init = (groups: SFormGroupsItemType[]) => {
  if (!Array.isArray(groups)) return [];
  return groups.map(group => ({
    type: group.type,
    label: group.label,
    isFull: group.isFull || false,
    modelName: group.modelName,
    maxLen: group.maxLen,
    placeholder: group.placeholder,
    textAreaContent: group.textAreaContent,
    optionItem: group.optionItem,
    ticksItem: group.ticksItem,
    accept: group.accept,
    rows: group.rows,
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
