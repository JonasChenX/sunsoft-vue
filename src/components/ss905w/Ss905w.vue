<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">系統日誌查看</div>
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
            <template v-slot:item.id="{ item }">
                <v-btn
                    v-if="item.id"
                    color="primary"
                    @click="downloadFile(item.id)"
                >
                    下載檔案
                </v-btn>
            </template>
        </s-table>
      </template>
    </v-container>
</template>
<script setup lang="ts">
import {ref, defineAsyncComponent, reactive} from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import { strChangFun } from '@/common/fun/fun-main'
import {getFileLog, getLogFileDownload} from "@/components/ss905w/ss905w-api";
import {ss905FormConfig} from "@/components/ss905w/ss905-form-config";
import {ss905TableHeader} from "@/components/ss905w/ss905-header-type";
import {Ss905TableItemType} from "@/components/ss905w/ss905-item-type";
import { downloadFun } from '@/common/fun/fun-main'
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
  name: "ss905w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss905FormConfig)

const headers = ref<STableHeaderType[]>([...ss905TableHeader])
const items = ref<Ss905TableItemType[]>([]);

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
  if(!getFormData){
      return;
  }
  sTableState.loading = true
  sTableState.isShow = true

  sTableState.search = ''
  sTableState.selected = []


  getFileLog(getFormData)
    .then(({ data }: { data: Ss905TableItemType[] }) => {
      items.value = data;
    }).catch((e) => {
      items.value = [];
    }).finally(() => {
      sTableState.loading = false
    })
}

const downloadFile = (id: string) => {
    getLogFileDownload(id).then((res)=>{
        if(!res){
            return;
        }
        downloadFun.downloadBlob(res)
    })
}
</script>