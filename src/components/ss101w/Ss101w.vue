<template>
  <div>SS101w</div>
  <v-container>
    <div class="text-center mb-10">
      <v-btn
          :disabled="loading"
          text="查詢"
          variant="outlined"
          @click="onClick"
      ></v-btn>
    </div>
    <s-table
      :headers="headers"
      :items="items"
      :isSelect="true"
      :isFilter="true"
      v-model:selected="selected"
      :loading="loading"
      v-model:search="search"
    >
      <template v-slot:item.hours="{ item }">
        <v-chip v-if="item.hours" :color="getColorByType(item.type)">
          {{ item.hours }}
        </v-chip>
      </template>
    </s-table>
    選擇{{selected}}
  </v-container>
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import { ss101TableHeader } from "@/components/ss101w/header-type";
import { Ss101TableItemType, ss101TableItemsTest} from "@/components/ss101w/item-type";
import {getColorByType} from "@/common/enum/leave-and-overtime";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
defineOptions({
  name: "ss101w"
});

const headers = ref<STableHeaderType[]>([...ss101TableHeader])
const items = ref<Ss101TableItemType[]>([...ss101TableItemsTest]);

const selected = ref<Ss101TableItemType[]>([]);
const search = ref('')
const loading = ref(false)

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    search.value = ''
    selected.value = []
    loading.value = false
  }, 2000)
}
</script>