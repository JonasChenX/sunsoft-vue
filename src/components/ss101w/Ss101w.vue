<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">申請紀錄查詢(特休/請假/加班)</div>
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
          v-model:selected="sTableState.selected"
          :loading="sTableState.loading"
          v-model:search="sTableState.search"
        >
          <template v-slot:item.hours="{ item }">
            <v-chip v-if="item.hours" :color="getColorByType(item.type)">
              {{ item.hours }}
            </v-chip>
          </template>
        </s-table>
      </template>
    </v-container>
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, reactive } from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import { ss101TableHeader } from "@/components/ss101w/ss101-header-type";
import { Ss101TableItemType} from "@/components/ss101w/ss101-item-type";
import { getColorByType } from "@/common/enum/leave-and-overtime";
import { ss101formConfig } from "@/components/ss101w/ss101-form-config";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import { queryApplicationRecords } from "@/components/ss101w/ss101w-api";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
  name: "ss101w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss101formConfig)

const headers = ref<STableHeaderType[]>([...ss101TableHeader])
const items = ref<Ss101TableItemType[]>([]);

const sTableState = reactive({
  search: '',
  selected: [],
  loading: false,
  isShow: false,
  isFilter: true
})

const search = async (): Promise<void> => {
  sTableState.loading = true
  sTableState.isShow = true

  sTableState.isFilter = false
  sTableState.search = ''
  sTableState.selected = []

  const getFormData = await sFormRef.value!.getFormData()

  queryApplicationRecords(getFormData)
    .then(({ data }: { data: Ss101TableItemType[] }) => {
      items.value = data;
      sTableState.isFilter = true;
    }).finally(() => {
      sTableState.loading = false;
    })
}
</script>