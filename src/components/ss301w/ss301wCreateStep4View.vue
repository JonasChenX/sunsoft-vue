<template>
    <v-card
        variant="outlined"
        color="surface-variant"
        subtitle="請撰寫到目前為止的工作經歷(以專案為單位)"
        title="工作經驗"
    >
        <template v-slot:append>
            <v-btn variant="outlined" @click="addWorkExperience">新增</v-btn>
        </template>
        <div>
            <div class="font-weight-bold ms-6 mb-2" v-show="activeWorkExperienceList.length > 0">現在</div>
            <v-timeline side="end" class="justify-start me-4" >
                <v-timeline-item
                    v-for="(item, index) in activeWorkExperienceList"
                    :key="item.key"
                    size="small"
                >
                    <v-card
                        class="pa-4"
                        variant="outlined"
                    >
                        <v-card-title class="pa-1">工作{{index + 1}}</v-card-title>
                        <v-divider class="my-3"></v-divider>
                        <s-form
                            ref="sFormStep4Ref"
                            :formConfig="item.workModel"
                        ></s-form>
                        <div class="d-flex justify-end">
                            <v-btn
                                variant="outlined"
                                size="small"
                                @click="item.isShowDelBtn = !item.isShowDelBtn"
                            >要刪除請點選</v-btn>
                        </div>
                        <v-expand-transition>
                            <div v-show="item.isShowDelBtn">
                                <v-divider class="my-3"></v-divider>
                                <v-btn size="small" variant="flat" color="red" @click="item.isDeleted = true">確定刪除</v-btn>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
            <div class="font-weight-bold ms-6 my-2" v-show="activeWorkExperienceList.length > 0">以前</div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {ss301CreateStep4FormConfig} from "@/components/ss301w/ss301-form-config.js";
import {SFormConfig, SFormFunction} from "@/common/s-form/s-form-type";
defineOptions({
    name: "ss301w-create-step4-view"
})

const activeWorkExperienceList = computed(() => workExperienceList.filter(item => !item.isDeleted))
type WorkItem = {
    key: string;
    isShowDelBtn: boolean;
    isDeleted: boolean;
    workModel: SFormConfig;
};
const workExperienceList: WorkItem[] = reactive([])
const addWorkExperience = () => {
    workExperienceList.push({
        key: crypto.randomUUID(),
        isShowDelBtn: false,
        isDeleted: false,
        workModel: ss301CreateStep4FormConfig,
    })
}
const sFormStep4Ref = ref<SFormFunction[]>([])
const getFormData = async () => {
    const resultList = []
    for (const form of sFormStep4Ref.value) {
        const data = await form.getFormData()
        if(!data){
            return null;
        }
        resultList.push(data)
    }
    return resultList
}
defineExpose({
    getFormData
});
</script>
