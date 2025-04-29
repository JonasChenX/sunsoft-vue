<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">功能面頁跳轉紀錄查看</div>
      <s-form
        ref="sFormRef"
        :formConfig="formConfig"
      ></s-form>
      <div class="d-flex justify-end">
        <v-btn
          :disabled="sTableState.loading"
          text="查詢"
          variant="outlined"
          @click="search"
        ></v-btn>
      </div>
    </v-container>
  </div>
    <v-container class="mb-5">
      <template v-if="sTableState.isShow">
        <s-table
          :headers="headers"
          :items="items"
          :isSelect="true"
          :isFilter="sTableState.isFilter"
          :isSortHeaders="sTableState.isSortHeaders"
          v-model:selected="sTableState.selected"
          :loading="sTableState.loading"
          v-model:search="sTableState.search"
        >
        </s-table>
      </template>
    </v-container>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import { ss903TableHeader } from "@/components/ss903w/ss903-header-type";
import { Ss903TableItemType } from "@/components/ss903w/ss903-item-type";
import { ss903FormConfig } from "@/components/ss903w/ss903-form-config";
import { SFormConfig, SFormFunction } from "@/common/s-form/s-form-type";
import { getFunIdLog } from "@/components/ss903w/ss903w-api";
defineOptions({
  name: "ss903w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss903FormConfig)

const headers = ref<STableHeaderType[]>([...ss903TableHeader])
const items = ref<Ss903TableItemType[]>([]);

const sTableState = reactive({
  search: '',
  selected: [],
  loading: false,
  isShow: false,
  isFilter: true,
  isSortHeaders: true
})

const search = async (): Promise<void> => {
  const getFormData = await sFormRef.value!.getFormData()
  if (!getFormData) {
    return
  }
  sTableState.loading = true
  sTableState.isShow = true

  sTableState.search = ''
  sTableState.selected = []

  getFunIdLog(getFormData)
    .then(({ data }: { data: Ss903TableItemType[] }) => {
      items.value = data;
    }).catch((e) => {
      items.value = [];
    }).finally(() => {
      sTableState.loading = false
  })
}
</script>