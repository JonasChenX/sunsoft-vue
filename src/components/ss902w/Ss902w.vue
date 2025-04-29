<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">登入紀錄查看</div>
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
            <template v-slot:item.success="{ item }">
                <v-chip v-if="item.success" :color="strChangFun.getColorByYN(item.success)">
                    {{ item.success }}
                </v-chip>
            </template>
        </s-table>
      </template>
    </v-container>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import { ss902TableHeader } from "@/components/ss902w/ss902-header-type";
import { Ss902TableItemType } from "@/components/ss902w/ss902-item-type";
import { ss902FormConfig } from "@/components/ss902w/ss902-form-config";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import { getLoginLog } from "@/components/ss902w/ss902w-api";
import { strChangFun } from '@/common/fun/fun-main'
defineOptions({
  name: "ss902w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss902FormConfig)

const headers = ref<STableHeaderType[]>([...ss902TableHeader])
const items = ref<Ss902TableItemType[]>([]);

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

  getLoginLog(getFormData)
    .then(({ data }: { data: Ss902TableItemType[] }) => {
      items.value = data;
    }).catch((e) => {
      items.value = [];
    }).finally(() => {
      sTableState.loading = false
  })
}
</script>