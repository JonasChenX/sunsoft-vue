<template>
  <div class="mb-3">
    <div v-if="title" class="text-subtitle-1 text-medium-emphasis">{{ title }}</div>
    <v-row class="dual-list-box-wrapper">
      <v-col>
        <v-card variant="outlined" elevation="1" :disabled="isDisabledProp">
          <v-card-title class="text-caption ma-0 pa-0 text-center bg-blue-grey-darken-1 py-1">待選擇區塊</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-2">
            <v-text-field
                v-model="searchSource"
                placeholder="輸入關鍵字搜尋..."
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="outlined"
                hide-details
                clearable
                :disabled="isDisabledProp"
                @click:clear="searchSource = ''"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-list density="compact" class="list-box" :disabled="isDisabledProp">
            <template v-for="(item, index) in filteredSource" :key="`src-${getItemKey(item, index)}`">
              <v-list-item
                  :value="getItemKey(item, index)"
                  :class="{ 'list-item-selected-for-move': isSourceSelectedForMove(item) }"
                  class="list-item-hover"
                  :active="false" @click="toggleSourceSelectionForMove(item)"
                  :disabled="isDisabledProp"
                  min-height="30px"
              >
                <v-list-item-title class="text-body-2">{{ getItemLabel(item) }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-if="!filteredSource.length && availableSourceItems.length > 0">
              <v-list-item-title class="text-disabled text-center">查無資料</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!availableSourceItems.length">
              <v-list-item-title class="text-disabled text-center">無可用項目</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="pa-0 d-flex flex-wrap align-stretch">
            <v-btn variant="text" color="primary" size="small" class="flex-1-0 pa-0" min-height="50px" @click="selectAllSourceForMove" :disabled="isDisabledProp || filteredSource.length === 0">全選</v-btn>
            <v-divider vertical></v-divider>
            <v-btn variant="text" color="primary" size="small" class="flex-1-0 pa-0" min-height="50px" @click="deSelectAllSourceForMove" :disabled="isDisabledProp || internalSourceSelection.size === 0">全不選</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="auto" class="d-flex flex-column justify-center align-self-center pa-0">
        <v-tooltip location="right" :disabled="isDisabledProp">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon variant="text" v-bind="activatorProps" class="my-1" @click="moveSelectedToDestination" :disabled="isDisabledProp || internalSourceSelection.size === 0">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </template>
          <span>將選取項目加入已選</span>
        </v-tooltip>
        <v-tooltip location="right" :disabled="isDisabledProp">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon variant="text" v-bind="activatorProps" class="my-1" @click="moveSelectedToSource" :disabled="isDisabledProp || internalDestinationSelection.size === 0">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </template>
          <span>從已選移除選取項目</span>
        </v-tooltip>
      </v-col>

      <v-col>
        <v-card variant="outlined" elevation="1" :disabled="isDisabledProp">
          <v-card-title class="text-caption ma-0 pa-0 text-center bg-blue-grey-darken-1 py-1">已選區塊</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-2">
            <v-text-field
                v-model="searchDestination"
                placeholder="輸入關鍵字搜尋..."
                prepend-inner-icon="mdi-magnify"
                density="compact"
                variant="outlined"
                hide-details
                clearable
                :disabled="isDisabledProp"
                @click:clear="searchDestination = ''"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-list density="compact" class="list-box" :disabled="isDisabledProp">
            <template v-for="(item, index) in filteredDestination" :key="`dest-${getItemKey(item, index)}`">
              <v-list-item
                  :value="getItemKey(item, index)"
                  :class="{ 'list-item-selected-for-move': isDestinationSelectedForMove(item) }"
                  class="list-item-hover"
                  :active="false" @click="toggleDestinationSelectionForMove(item)"
                  :disabled="isDisabledProp"
                  min-height="30px"
              >
                <v-list-item-title class="text-body-2">{{ getItemLabel(item) }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-if="!filteredDestination.length && modelValue.length > 0">
              <v-list-item-title class="text-disabled text-center">查無資料</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!modelValue.length">
              <v-list-item-title class="text-disabled text-center">尚未選擇項目</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="pa-0 d-flex flex-wrap align-stretch">
            <v-btn variant="text" color="primary" size="small" class="flex-1-0 pa-0" min-height="50px" @click="selectAllDestinationForMove" :disabled="isDisabledProp || filteredDestination.length === 0">全選</v-btn>
            <v-divider vertical></v-divider>
            <v-btn variant="text" color="primary" size="small" class="flex-1-0 pa-0" min-height="50px" @click="deSelectAllDestinationForMove" :disabled="isDisabledProp || internalDestinationSelection.size === 0">全不選</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0 selected-summary-wrapper" v-if="modelValue.length > 0 || !isDisabledProp">
      <v-col>
        <div class="border-md rounded pa-3 bg-grey-lighten-5" :class="{ 'disabled-overlay': isDisabledProp, 'error-border': errorMessages && errorMessages.length > 0 }">
          <h4 class="text-subtitle-2 font-weight-medium mb-2">最終已選項目：</h4>
          <v-chip-group v-if="currentlySelectedItems.length > 0" column>
            <v-chip
                v-for="(item, index) in currentlySelectedItems"
                :key="`summary-${getItemKey(item, index)}`"
                label
                size="small"
                class="ma-1"
                :disabled="isDisabledProp"
                :ripple="false"
            >
              {{ getItemLabel(item) }}
            </v-chip>
          </v-chip-group>
          <p v-else class="text-disabled font-italic text-body-2">尚未選擇任何項目</p>
        </div>
        <div v-if="errorMessages && errorMessages.length > 0" class="text-error text-caption mt-1 ml-4">
          <p v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue';

// 定義來源列表項目的介面
interface SourceListItem {
  [key: string]: any; // 允許項目上具有任意屬性
}

// 定義元件 props
const props = defineProps({
  /**
   * 可選的雙列表框元件標題。
   */
  title: { type: String, default: '' },
  /**
   * 完整的可用項目列表。
   */
  source: { type: Array as PropType<SourceListItem[]>, default: () => [] },
  /**
   * 代表目前已選取項目的值陣列 (來自 `valueKey`)。
   * 這是 v-model 屬性。
   */
  modelValue: { type: Array as PropType<string[]>, default: () => [] },
  /**
   * 每個來源項目中用作其顯示標籤的屬性名稱。
   * 預設為 'title'。若找不到則嘗試 'label'，然後是建構的字串。
   */
  label: { type: String, default: 'title' },
  /**
   * 每個來源項目中用作其唯一鍵值的屬性名稱。
   * 對於 Vue 的列表渲染和內部追蹤非常重要。
   * 預設為 'id'。若找不到則使用生成的鍵值。
   */
  itemKey: { type: String, default: 'id' },
  /**
   * 每個來源項目中，其值會被發射到 modelValue 的屬性名稱。
   * 預設為 'value'。
   */
  valueKey: { type: String, default: 'value' },
  /**
   * 若為 true，則禁用整個元件。
   */
  isDisabled: { type: Boolean, default: false },
  /**
   * 錯誤訊息陣列，由父元件傳入。
   */
  errorMessages: { type: Array as PropType<string[]>, default: () => [] }
});

// 定義元件 emits
const emit = defineEmits<{
  /**
   * 當已選項目改變時發射。
   * @param payload - 代表新選取項目的字串值陣列。
   */
  (e: 'update:modelValue', payload: string[]): void,
  (e: 'blur'): void
}>();

// --- 響應式狀態 ---
const searchSource = ref<string>(''); // 來源列表的搜尋詞
const searchDestination = ref<string>(''); // 目標列表的搜尋詞
const isDisabledProp = ref<boolean>(props.isDisabled); // isDisabled prop 的內部響應式副本

// 用於儲存從來源列表或目標列表選取以待移動的項目鍵值集合
const internalSourceSelection = ref<Set<string | number>>(new Set());
const internalDestinationSelection = ref<Set<string | number>>(new Set());

// --- 計算屬性 ---

/**
 * @description 計算來源列表中可用（尚未選入 modelValue）的項目。
 * @returns {SourceListItem[]} 可供選擇的項目陣列。
 */
const availableSourceItems = computed<SourceListItem[]>(() => {
  const selectedValuesSet = new Set(props.modelValue);
  return props.source.filter(item => !selectedValuesSet.has(item[props.valueKey]));
});

/**
 * @description 根據 `searchSource` 詞彙篩選 `availableSourceItems`。
 * @returns {SourceListItem[]} 用於來源列表的已篩選項目陣列。
 */
const filteredSource = computed<SourceListItem[]>(() => {
  const itemsToFilter = availableSourceItems.value;
  if (!searchSource.value) return itemsToFilter;
  const searchTerm = searchSource.value.toLowerCase();
  return itemsToFilter.filter(item =>
      getItemLabelString(item).toLowerCase().includes(searchTerm)
  );
});

/**
 * @description 計算 `modelValue` 中目前選定值的完整項目物件。
 * 項目的順序將基於它們在 `props.source` 中的原始順序。
 * @returns {SourceListItem[]} 目前已選取的項目物件陣列。
 */
const currentlySelectedItems = computed<SourceListItem[]>(() => {
  const selectedValuesSet = new Set(props.modelValue);
  // 為了保持某種程度的穩定順序，從原始 source 進行篩選
  const items = props.source.filter(item => selectedValuesSet.has(item[props.valueKey]));
  return items;
});

/**
 * @description 根據 `searchDestination` 詞彙篩選 `currentlySelectedItems` (目標列表)。
 * @returns {SourceListItem[]} 用於目標列表的已篩選項目陣列。
 */
const filteredDestination = computed<SourceListItem[]>(() => {
  const itemsToFilter = currentlySelectedItems.value;
  if (!searchDestination.value) return itemsToFilter;
  const searchTerm = searchDestination.value.toLowerCase();
  return itemsToFilter.filter(item =>
      getItemLabelString(item).toLowerCase().includes(searchTerm)
  );
});

// --- 監聽器 ---
/**
 * @description 監聽 `isDisabled` prop 的變化並更新內部狀態。
 * 如果元件變為禁用狀態，則清除所有待處理的選取。
 */
watch(() => props.isDisabled, (newVal) => {
  isDisabledProp.value = newVal;
  if (newVal) {
    internalSourceSelection.value.clear();
    internalDestinationSelection.value.clear();
  }
});

/**
 * @description 監聽 `modelValue` (已選項目) 的變化。
 * 這對於在項目被程式化移動、從外部更改，或作為移動操作的結果時，
 * 同步內部「選取以待移動」狀態 (`internalSourceSelection`, `internalDestinationSelection`) 至關重要。
 */
watch(() => props.modelValue, (newModelValue) => {
  const newModelValueSet = new Set(newModelValue);

  // 清理 internalSourceSelection:
  // 如果一個已標記為從來源移動的項目現在存在於 modelValue 中 (即它已被移至目標區)，
  // 則將其從來源的「選取以待移動」列表中移除。
  new Set(internalSourceSelection.value).forEach(key => {
    const item = props.source.find(sItem => getItemKey(sItem) === key);
    if (item && newModelValueSet.has(item[props.valueKey])) {
      internalSourceSelection.value.delete(key);
    }
  });

  // 清理 internalDestinationSelection:
  if (newModelValue.length === 0) {
    // 如果目標列表為空，則清除其「選取以待移動」列表。
    internalDestinationSelection.value.clear();
  } else {
    // 如果一個已標記為從目標移動的項目不再存在於 modelValue 中 (即它已被移回來源區)，
    // 則將其從目標的「選取以待移動」列表中移除。
    new Set(internalDestinationSelection.value).forEach(key => {
      const item = props.source.find(sItem => getItemKey(sItem) === key);
      if (item && !newModelValueSet.has(item[props.valueKey])) {
        internalDestinationSelection.value.delete(key);
      } else if (!item) { // 防禦性：項目已不存在於來源數據中
        internalDestinationSelection.value.delete(key);
      }
    });
  }

  // 當 modelValue 改變時，觸發 blur 事件
  emit('blur');
}, { deep: true });


// --- 輔助函數 ---

/**
 * @description 獲取列表項目的唯一鍵值。
 * 如果 `props.itemKey` 可用，則使用它；否則，回退到索引或隨機字串。
 * @param {SourceListItem} item - 列表項目。
 * @param {number} [index] - 項目在列表中的可選索引。
 * @returns {string | number} 項目的唯一鍵值。
 */
function getItemKey(item: SourceListItem, index?: number): string | number {
  if (props.itemKey && item[props.itemKey] != null) return item[props.itemKey];
  return index !== undefined ? `gen-${index}` : `gen-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * @description 獲取列表項目的顯示標籤。
 * 優先使用 `props.label`，然後是 'label'，最後是根據鍵和值建構的字串。
 * @param {SourceListItem} item - 列表項目。
 * @returns {string} 項目的顯示標籤。
 */
function getItemLabel(item: SourceListItem): string {
  if (props.label && props.label in item && item[props.label] != null) return String(item[props.label]);
  // 如果 props.label 未找到或未設定，則回退到常見的 'label' 屬性
  const defaultLabelKey = 'label';
  if (defaultLabelKey in item && item[defaultLabelKey] != null) return String(item[defaultLabelKey]);
  // 如果找不到合適的標籤屬性，則為最終回退方案
  const key = getItemKey(item);
  const value = item[props.valueKey] ?? 'N/A';
  return `鍵: ${key}, 值: ${value}`;
}

/**
 * @description 將項目標籤強制轉換為字串，確保它在比較時永不為 null/undefined。
 * @param {SourceListItem} item - 列表項目。
 * @returns {string} 項目標籤的字串表示。
 */
function getItemLabelString(item: SourceListItem): string {
  return String(getItemLabel(item) ?? '');
}

/**
 * @description 檢查來源列表中的項目當前是否被選取以待移動。
 * @param {SourceListItem} item - 來源列表項目。
 * @returns {boolean} 如果選取以待移動則為 true，否則為 false。
 */
function isSourceSelectedForMove(item: SourceListItem): boolean {
  return internalSourceSelection.value.has(getItemKey(item));
}

/**
 * @description 檢查目標列表中的項目當前是否被選取以待移動。
 * @param {SourceListItem} item - 目標列表項目。
 * @returns {boolean} 如果選取以待移動則為 true，否則為 false。
 */
function isDestinationSelectedForMove(item: SourceListItem): boolean {
  return internalDestinationSelection.value.has(getItemKey(item));
}

// --- 內部移動選取狀態切換 ---

/**
 * @description 切換來源列表中項目的「選取以待移動」狀態。
 * @param {SourceListItem} item - 要切換的來源列表項目。
 */
function toggleSourceSelectionForMove(item: SourceListItem): void {
  if (isDisabledProp.value) return;
  const key = getItemKey(item);
  if (internalSourceSelection.value.has(key)) internalSourceSelection.value.delete(key);
  else internalSourceSelection.value.add(key);
}

/**
 * @description 切換目標列表中項目的「選取以待移動」狀態。
 * @param {SourceListItem} item - 要切換的目標列表項目。
 */
function toggleDestinationSelectionForMove(item: SourceListItem): void {
  if (isDisabledProp.value) return;
  const key = getItemKey(item);
  if (internalDestinationSelection.value.has(key)) internalDestinationSelection.value.delete(key);
  else internalDestinationSelection.value.add(key);
}

// --- 核心邏輯方法 (移動項目) ---

/**
 * @description 將目前在 `internalSourceSelection` 中標記的項目移動到目標列表 (更新 modelValue)。
 */
function moveSelectedToDestination(): void {
  if (isDisabledProp.value || internalSourceSelection.value.size === 0) return;
  const valuesToAdd: string[] = [];
  // 遍歷在來源列表中選取的鍵值
  internalSourceSelection.value.forEach(key => {
    // 在 *目前可用的* 來源項目中找到對應的項目
    const item = availableSourceItems.value.find(sItem => getItemKey(sItem) === key);
    if (item && item[props.valueKey] != null && !props.modelValue.includes(item[props.valueKey])) {
      valuesToAdd.push(item[props.valueKey]);
    }
  });

  if (valuesToAdd.length > 0) {
    emit('update:modelValue', [...props.modelValue, ...valuesToAdd]);
  }
  internalSourceSelection.value.clear(); // 移動後清除選取
}

/**
 * @description 將目前在 `internalDestinationSelection` 中標記的項目移回來源列表 (更新 modelValue)。
 */
function moveSelectedToSource(): void {
  if (isDisabledProp.value || internalDestinationSelection.value.size === 0) return;

  const valuesToRemove = new Set<string>();
  // 遍歷在目標列表中選取的鍵值
  internalDestinationSelection.value.forEach(key => {
    // 在 *目前已選取的* (目標) 項目中找到對應的項目
    const item = currentlySelectedItems.value.find(dItem => getItemKey(dItem) === key);
    if (item && item[props.valueKey] != null) {
      valuesToRemove.add(item[props.valueKey]);
    }
  });

  if (valuesToRemove.size > 0) {
    emit('update:modelValue', props.modelValue.filter(val => !valuesToRemove.has(val)));
  }
  // 此處無需為從目標移回來源的項目顯式清除 internalSourceSelection，
  // modelValue 監聽器會處理，如果它們不知何故也存在於 internalSourceSelection 中的話。
  internalDestinationSelection.value.clear(); // 移動後清除選取
}

// --- 批次內部移動選取 ---
/**
 * @description 選取來源列表中所有 *可見的* (已篩選的) 項目以待移動。
 */
function selectAllSourceForMove(): void {
  if (isDisabledProp.value || filteredSource.value.length === 0) return;
  internalSourceSelection.value.clear();
  filteredSource.value.forEach(item => {
    internalSourceSelection.value.add(getItemKey(item));
  });
}

/**
 * @description 取消選取所有目前已標記為從來源列表移動的項目。
 */
function deSelectAllSourceForMove(): void {
  if (isDisabledProp.value || internalSourceSelection.value.size === 0) return;
  internalSourceSelection.value.clear();
}

/**
 * @description 選取目標列表中所有 *可見的* (已篩選的) 項目以待移動。
 */
function selectAllDestinationForMove(): void {
  if (isDisabledProp.value || filteredDestination.value.length === 0) return;
  internalDestinationSelection.value.clear();
  filteredDestination.value.forEach(item => {
    internalDestinationSelection.value.add(getItemKey(item));
  });
}

/**
 * @description 取消選取所有目前已標記為從目標列表移動的項目。
 */
function deSelectAllDestinationForMove(): void {
  if (isDisabledProp.value || internalDestinationSelection.value.size === 0) return;
  internalDestinationSelection.value.clear();
}

</script>

<style scoped>
/* 設定列表框的固定高度並啟用垂直捲動 */
.list-box {
  height: 250px;
  overflow-y: auto;
  background-color: #fdfdfd;
}

/* 強化已選取並準備移動的項目的樣式 */
.list-item-selected-for-move {
  background-color: rgba(24, 19, 19, 0.15) !important;
  border-left: 3px solid black;
}

/* 「無資料」或「無項目」佔位文字的樣式 */
.text-disabled.text-center {
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  padding: 16px 0;
}

.error-border {
  border: 1px solid #B71C1C !important; /* Vuetify 預設的 error 顏色 */
}
</style>