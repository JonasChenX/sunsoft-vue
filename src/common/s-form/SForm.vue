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
              :append-inner-icon="formItem.visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="formItem.visible ? 'text' : 'password'"
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

        <!-- checkbox(可添加複選) -->
        <template v-if="formItem.type == 'checkboxM'">
          <div class="text-subtitle-1 text-medium-emphasis">{{ formItem.label }}</div>
            <v-combobox
              density="compact"
              v-model="formData[formItem.modelName]"
              v-model:search="formItem.search"
              :custom-filter="queryFilter(formItem.optionItem, formData[formItem.modelName])"
              :items="formItem.optionItem"
              item-value="title"
              :return-object="false"
              variant="outlined"
              hide-selected
              multiple
              @update:modelValue="handleModelUpdate($event, formData[formItem.modelName], formItem)"
              @blur="$v[formItem.modelName]?.$touch"
              @change="$v[formItem.modelName]?.$touch"
              :error-messages="$v[formItem.modelName]?.$errors.map((e: any) => e.$message)"
            >
              <!-- 項目被選取後，在 input 欄中顯示的 chip -->
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="item === Object(item)"
                  :text="item.title"
                  size="small"
                  variant="flat"
                  closable
                  label
                  @click:close="removeSelection(index, formData[formItem.modelName])"
                />
              </template>

              <template v-slot:item="{ props, item }">
                <!-- 若為 header 且有輸入 search，顯示 "Create + 輸入內容" 的提示 -->
                <v-list-item v-if="item.raw.header && formItem.search">
                  <span class="mr-3">Create</span>
                  <v-chip
                    size="small"
                    variant="flat"
                    label
                  >
                    {{ formItem.search }}
                  </v-chip>
                </v-list-item>

                <!-- 若為 header (但無 search)，顯示分類標題 -->
                <v-list-subheader
                  v-else-if="item.raw.header"
                  :title="item.title"
                ></v-list-subheader>

                <!-- 一般的下拉選項 -->
                <v-list-item v-else @click="handleItemClick(props, formItem)">
                  <!-- 若該項目正被編輯，顯示可編輯的輸入框 -->
                  <v-text-field
                    v-if="formItem.editingItem === item.raw"
                    v-model="formItem.editingItem['title']"
                    bg-color="transparent"
                    class="mr-3"
                    density="compact"
                    variant="plain"
                    autofocus
                    hide-details
                    @click.stop
                    @keydown.stop
                    @keyup.enter="edit(item.raw, formItem)"
                  ></v-text-field>

                  <!-- 否則顯示該項目的 chip -->
                  <v-chip
                    v-else
                    :text="item.raw.title"
                    variant="flat"
                    label
                    size="small"
                  ></v-chip>

                  <!-- 右側的操作按鈕 (編輯 / 確認) -->
                  <template v-slot:append>
                      <v-btn
                        v-if="formItem.editingItem === item.raw"
                        :color="formItem.editingItem !== item.raw ? 'primary' : 'red'"
                        icon="mdi-delete"
                        size="small"
                        variant="text"
                        @click.stop.prevent="removeOptionItem(item.raw, formItem)"
                      ></v-btn>
                    <v-btn
                      :color="formItem.editingItem !== item.raw ? 'primary' : 'success'"
                      :icon="formItem.editingItem !== item.raw ? 'mdi-pencil' : 'mdi-check'"
                      size="small"
                      variant="text"
                      @click.stop.prevent="edit(item.raw, formItem)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-combobox>
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
import {
    SFormGroupsItemInitType,
    SFormGroupsItemType,
    SFormItemOption,
    SFormValidation
} from "@/common/s-form/s-form-type";
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
    visible: false,
    search: '',
    editingItem: null,
    previousModel: null
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

const handleModelUpdate = (val: string[], modelList: string[],formItem: SFormGroupsItemInitType) => {
    const items = formItem.optionItem;
    if (!items) {
        return
    }
    const editingItem = formItem.editingItem;
    if(editingItem !== null){
      return
    }
    const existingTitles = items?.map(item => item.title)
    if (!existingTitles) {
        return
    }

    const uniqueVal = Array.from(new Set(val)) // 先去重複
    const newItems = uniqueVal.filter(v => !existingTitles.includes(v))

    // 加入新項目（非重複的）
    newItems.forEach(v => {
        items.push({ title: v })
    })

    // 更新 modelList，但只保留有對應 items 的
    modelList.length = 0
    uniqueVal.forEach(v => {
        if (items.find(i => i.title === v)) {
            modelList.push(v)
        }
    })
}

const edit = (item: SFormItemOption, formItem: SFormGroupsItemInitType) => {
    if (!formItem.optionItem) {
        return
    }
    const isEditing = formItem.editingItem === item
    if (isEditing) {
        const newTitle = item.title?.trim()
        const allTitles = formItem.optionItem.map(opt => opt.title)
        const duplicateCount = allTitles.filter(title => title === newTitle).length

        // 如果同名 title 超過 1（自己也算進去），代表有重複
        if (duplicateCount > 1) {
            return
        }

        // 進行儲存：退出編輯模式
        formItem.editingItem = null
    } else {
        // 進入編輯模式
        formItem.editingItem = item
    }
}

const queryFilter = (items: SFormItemOption[], model: string[]) => {
    return (value: unknown, queryText: string, item: { raw: SFormItemOption }): boolean => {

        const toLowerCaseString = (val: unknown): string =>
            String(val != null ? val : '').toLowerCase()

        const query = toLowerCaseString(queryText)

        const availableOptions = items.filter(x => !model.includes(x.title))

        const hasAnyMatch = availableOptions.some(
            x => !x.header && toLowerCaseString(x.title).includes(query)
        )

        if (item.raw.header) return !hasAnyMatch

        const text = toLowerCaseString(item.raw.title)

        return text.includes(query)
    }
}
const removeSelection = (index: number, modelList: string[]) => {
    modelList.splice(index, 1)
}

const removeOptionItem = (item: SFormItemOption, formItem: SFormGroupsItemInitType) => {
    if(!formItem.optionItem){
        return
    }
    const index = formItem.optionItem.findIndex((i: SFormItemOption) => i === item)
    if (index !== -1) {
        formItem.optionItem.splice(index, 1)
        // 如果正在編輯的是這筆，也一併清除
        if (formItem.editingItem === item) {
            formItem.editingItem = null
        }
    }
}
const handleItemClick = (props: any, formItem: SFormGroupsItemInitType) => {
    if(formItem.editingItem !== null){
        console.log("正在編輯，跳過點擊")
        return
    }
    props.onClick()
}

</script>
