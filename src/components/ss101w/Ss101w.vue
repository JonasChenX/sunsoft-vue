<template>
  <div class="ma-5">
    <v-container class="border-md">
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
          :isFilter="true"
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
import {ref, defineAsyncComponent, reactive} from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import { ss101TableHeader } from "@/components/ss101w/header-type";
import { Ss101TableItemType, ss101TableItemsTest} from "@/components/ss101w/item-type";
import { getColorByType } from "@/common/enum/leave-and-overtime";
import {ss101formConfig} from "@/components/ss101w/ss101-form-config";
import {formConfigTest} from "@/common/s-form/s-form-type";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
  name: "ss101w"
});

const sFormRef = ref(null)

//表單設定檔
const formConfig = reactive<any>(ss101formConfig)

const headers = ref<STableHeaderType[]>([...ss101TableHeader])
const items = ref<Ss101TableItemType[]>([]);

const sTableState = reactive({
    search: '',
    selected: [],
    loading: false,
    isShow: false,
})

const search = async (): Promise<void> => {
    sTableState.loading = true
    sTableState.isShow = true

    const getFormData = await sFormRef.value.getFormData()
    console.log(getFormData)

    setTimeout(() => {
      sTableState.search = ''
      sTableState.selected = []
      sTableState.loading = false
      items.value = [...ss101TableItemsTest]
    }, 2000)
}
</script>