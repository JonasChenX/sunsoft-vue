<template>
  <v-data-table
    v-model="selectedValue"
    :items="items"
    :headers="headers"
    return-object
    :show-select="props.isSelect"
    :search="searchValue"
    items-per-page-text="每頁"
    :items-per-page="10"
    :items-per-page-options="perPageOptions"
    hover
    no-data-text="查無資料"
    loading-text="查詢中請稍後..."
    :loading="props.loading"
    :style="'white-space:nowrap'"
    item-selectable="selectable"
    :hide-default-footer="props.loading || props.isHideFooter"
  >
    <!-- Filter搜尋器 -->
    <template v-if="props.isFilter" v-slot:top>
      <v-text-field
        v-model="searchValue"
        class="pa-0"
        label="輸入篩選器"
        clearable
      ></v-text-field>
    </template>
    <!-- 可以在父層定義插槽 -->
    <template v-for="(_, slot) in $slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <!-- Loading顯示 -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@1"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { STableHeaderType, STableItemType } from "@/common/s-table/s-table-type";
defineOptions({
  name: "s-table"
});

const props = defineProps({
  headers: {
    type: Array as PropType<STableHeaderType[]>,
    required: true
  },
  items: {
    type: Array as PropType<STableItemType[]>,
    required: true
  },
  isSelect: {
    type: Boolean,
    default: false
  },
  isFilter: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  isHideFooter: {
      type: Boolean,
      default: false
  },
});

const perPageOptions = [
  { title: "10", value: 10 },
  { title: "25", value: 25 },
  { title: "50", value: 50 },
  { title: "100", value: 100 },
]

const selectedValue = defineModel('selected', { default: [] });
const searchValue = defineModel('search', { default: '' });
</script>