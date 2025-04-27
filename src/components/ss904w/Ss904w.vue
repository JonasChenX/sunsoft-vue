<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">功能API執行紀錄查看</div>
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
import {ref, defineAsyncComponent, reactive, onMounted} from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import { strChangFun } from '@/common/fun/fun-main'
import {Ss904TableItemType} from "@/components/ss904w/ss904-item-type";
import {ss904TableHeader} from "@/components/ss904w/ss904-header-type";
import {getAPIExeLog, getFunCodeOption} from "@/components/ss904w/ss904w-api";
import {ss904FormConfig} from "@/components/ss904w/ss904-form-config";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
  name: "ss904w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss904FormConfig)
onMounted(async () => {
    await initFunCodeOption()
})

const initFunCodeOption = async () =>{
    const { data: funCodeOptions } = await getFunCodeOption();
    const funCodeGroup = formConfig.groups.find((group: any) => group.modelName === 'funCode');
    if (funCodeGroup) {
        funCodeGroup.optionItem?.push(...funCodeOptions);
    }
}

const headers = ref<STableHeaderType[]>([...ss904TableHeader])
const items = ref<Ss904TableItemType[]>([]);

const sTableState = reactive({
  search: '',
  selected: [],
  loading: false,
  isShow: false,
  isFilter: true,
  isSortHeaders: true
})

const search = async (): Promise<void> => {
  sTableState.loading = true
  sTableState.isShow = true

  sTableState.search = ''
  sTableState.selected = []

  const getFormData = await sFormRef.value!.getFormData()
    getAPIExeLog(getFormData)
    .then(({ data }: { data: Ss904TableItemType[] }) => {
      items.value = data;
    }).catch((e) => {
      items.value = [];
    }).finally(() => {
      sTableState.loading = false
  })
}
</script>