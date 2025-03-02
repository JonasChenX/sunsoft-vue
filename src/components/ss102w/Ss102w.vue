<template>
    <div class="ma-5">
        <v-container class="border-md rounded">
            <div class="text-h5 mb-3">出勤時數查詢</div>
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
            <div class="border-md rounded">
                <s-table
                    :headers="headers"
                    :items="items"
                    :isSelect="false"
                    :isFilter="false"
                    :loading="sTableState.loading"
                    :isHideFooter="true"
                >
                    <template v-slot:item.annualLeaveRemaining="{ item }">
                        <v-chip v-if="item.annualLeaveRemaining" :color="'green'">
                            {{ item.annualLeaveRemaining }}
                        </v-chip>
                    </template>
                    <template v-slot:item.compensatoryLeaveRemaining="{ item }">
                        <v-chip v-if="item.compensatoryLeaveRemaining" :color="'green'">
                            {{ item.compensatoryLeaveRemaining }}
                        </v-chip>
                    </template>
                </s-table>
            </div>
        </template>
    </v-container>
    <v-container class="mb-5">
        <template v-if="sTableState.isShow">
            <div class="border-md rounded">
                <s-table
                    :headers="headersB"
                    :items="itemsB"
                    :isSelect="true"
                    :isFilter="true"
                    :loading="sTableState.loading"
                    :isHideFooter="false"
                >
                    <template v-slot:item.hours="{ item }">
                        <v-chip v-if="item.hours" :color="getColorByType(item.type)">
                            {{ item.hours }}
                        </v-chip>
                    </template>
                </s-table>
            </div>
        </template>
    </v-container>
</template>
<script setup lang="ts">
import {ref, defineAsyncComponent, reactive} from 'vue';
import { STableHeaderType } from "@/common/s-table/s-table-type";
import {ss102TableHeader, ss102TableHeaderB} from "@/components/ss102w/ss102-header-type";
import {ss102formConfig} from "@/components/ss102w/ss102-form-config";
import {
    Ss102TableItemType,
    ss102TableItemTest,
    Ss102TableItemTypeB,
    ss102TableItemTestB
} from "@/components/ss102w/ss102-item-type";
import {getColorByType} from "@/common/enum/leave-and-overtime";
const STable = defineAsyncComponent(() => import('@/common/s-table/STable.vue'));
const SForm = defineAsyncComponent(() => import('@/common/s-form/SForm.vue'));
defineOptions({
    name: "ss102w"
});

const sFormRef = ref(null)

//表單設定檔
const formConfig = reactive<any>(ss102formConfig)

//查詢 時數結果
const headers = ref<STableHeaderType[]>([...ss102TableHeader])
const items = ref<Ss102TableItemType[]>([]);

//查詢時數明細
const headersB = ref<STableHeaderType[]>([...ss102TableHeaderB])
const itemsB = ref<Ss102TableItemTypeB[]>([]);

const sTableState = reactive({
    loading: false,
    isShow: false,
})

const search = async (): Promise<void> => {
    sTableState.loading = true
    sTableState.isShow = true

    const getFormData = await sFormRef.value.getFormData()
    console.log(getFormData)

    setTimeout(() => {
        sTableState.loading = false
        items.value = [...ss102TableItemTest]
        itemsB.value = [...ss102TableItemTestB]
    }, 2000)
}
</script>