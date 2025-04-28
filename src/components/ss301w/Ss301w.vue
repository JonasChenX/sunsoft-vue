<template>
  <div class="ma-5">
    <v-container class="border-md rounded">
      <div class="text-h5 mb-3">員工基本資料管理</div>
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
          <template v-slot:item.details="{ item }">
            <v-btn
                v-if="item.id"
                color="primary"
            >
              詳細資料
            </v-btn>
          </template>
        </s-table>
      </template>
    </v-container>
</template>
<script setup lang="ts">
import {ref, defineAsyncComponent, reactive } from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
import {ss301FormConfig} from "@/components/ss301w/ss301-form-config";
import {Ss301TableItemType} from "@/components/ss301w/ss301-item-type";
import {queryUserAccount} from "@/components/ss301w/ss301w-api";
import {ss301TableHeader} from "@/components/ss301w/ss301-header-type";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
  name: "ss301w"
});

const sFormRef = ref<SFormFunction | null>(null)

//表單設定檔
const formConfig : SFormConfig = reactive<any>(ss301FormConfig)

const headers = ref<STableHeaderType[]>([...ss301TableHeader])
const items = ref<Ss301TableItemType[]>([]);

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
  queryUserAccount(getFormData)
    .then(({ data }: { data: Ss301TableItemType[] }) => {
      items.value = data;
    }).catch((e) => {
      items.value = [];
    }).finally(() => {
      sTableState.loading = false
  })
}

</script>