<template>
  <div class="border-md rounded">
    <v-data-table
      v-model="selectedValue"
      :items="items"
      :headers="headerList"
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
      <template  v-slot:top>
        <!-- Filter搜尋器 -->
        <template v-if="props.isFilter && !props.loading">
          <v-text-field
            v-model="searchValue"
            class="pa-0"
            label="輸入篩選器"
            clearable
            :hide-details="true"
          ></v-text-field>
        </template>
        <template v-if="props.isSortHeaders && !props.loading">
          <div class="d-flex justify-end ma-1">
            <v-menu
                location="bottom"
                scroll-strategy="none"
                :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    rounded="lg"
                    size="small"
                    variant="text"
                    border
                >
                  <div>調整欄位順序</div>
                  <font-awesome-icon icon="bars" class="ma-1" />
                </v-btn>
              </template>
                <v-list>
                  <v-list-item class="text-center">
                    <v-btn
                      v-bind="props"
                      rounded="lg"
                      size="small"
                      text="重置欄位"
                      variant="text"
                      border
                      @click="resetHeaders"
                    ></v-btn>
                  </v-list-item>
                  <v-divider></v-divider>
                  <draggable
                    :list="headerList"
                    tag="transition-group"
                    item-key="id"
                  >
                    <v-list-item
                      v-for="(item, index) in headerList"
                      :key="index"
                      :title="item.title"
                      class="draggable-box"
                    >
                      <template v-slot:append>
                        <v-btn
                          text="移除"
                          variant="flat"
                          size="small"
                          border
                          class="ms-3"
                          color="#E64A19"
                          @click="removeHeader(item.title)"
                          v-if="headerList.length > 1 && item.visibleByRemove"
                        ></v-btn>
                      </template>
                    </v-list-item>
                  </draggable>
                </v-list>
            </v-menu>
          </div>
        </template>
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
  </div>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import { STableHeaderType, STableItemType } from "@/common/s-table/s-table-type";
import { VueDraggableNext as draggable } from 'vue-draggable-next'
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
  isSortHeaders: {
    type: Boolean,
    default: false
  },
});

const initializeHeaders = (headers: STableHeaderType[]): STableHeaderType[] => {
  return headers.map(header => ({
    ...header,
    visibleByRemove: header.hasOwnProperty('visibleByRemove') ? header.visibleByRemove : true
  }));
};
const headerList = ref<STableHeaderType[]>(initializeHeaders(props.headers));
const resetHeaders = () => {
  headerList.value = initializeHeaders(props.headers);
}
const removeHeader = (title: string) => {
  headerList.value = headerList.value.filter((item) => item.title != title);
}

const perPageOptions = [
  { title: "10", value: 10 },
  { title: "25", value: 25 },
  { title: "50", value: 50 },
  { title: "100", value: 100 },
]

const selectedValue = defineModel('selected', { default: [] });
const searchValue = defineModel('search', { default: '' });
</script>
<style scoped>
.draggable-box {
  cursor: grab;
  user-select: none; /* 防止選取文字 */
}
</style>