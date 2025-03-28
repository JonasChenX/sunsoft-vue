<template>
  <div class="bg-primary">
    <v-container>
      <div class="text-h5 text-center font-weight-medium">人事差勤管理系統</div>
      <div class="text-center mb-6 font-weight-medium">本地端開發登入頁面</div>
      <v-card class="pa-10 mb-8 elevation-3 rounded-lg" variant="elevated" loading="true">
        <div class="text-subtitle-2 text-medium-emphasis">ID</div>
        <v-text-field
            density="compact"
            placeholder="請輸入ID"
            variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-2 text-medium-emphasis">Email</div>
        <v-text-field
            density="compact"
            placeholder="請輸入Email"
            variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-2 text-medium-emphasis">名稱</div>
        <v-text-field
            density="compact"
            placeholder="請輸入名稱"
            variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-2 text-medium-emphasis">群組列表</div>
        <v-combobox
            v-model="combobox.select"
            :items="combobox.items"
            chips
            multiple
            variant="outlined"
        ></v-combobox>

        <div class="text-subtitle-2 text-medium-emphasis">權限勾選</div>
        <div class="border-md rounded mb-6">
          <v-data-table
              :headers="headers"
              :items="menuItems"
              item-value="id"
              show-expand
              hide-default-footer
          >
            <template v-slot:item.meta.directory="{ item }">
              <v-chip :color="item.meta.directory ? 'teal' : 'indigo'">
                {{ item.meta.directory ? '目錄' : '功能' }}
              </v-chip>
            </template>

            <template v-slot:item.data-table-expand="{item, internalItem, isExpanded, toggleExpand }">
              <v-btn
                  v-if="item.meta.directory"
                  :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  :text="isExpanded(internalItem) ? '縮合功能代號項目' : '展開功能代號項目'"
                  class="text-none"
                  color="medium-emphasis"
                  size="small"
                  variant="text"
                  border
                  slim
                  @click="toggleExpand(internalItem)"
              ></v-btn>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-switch
                  v-model="item.enabled"
                  :disabled="item.meta.directory && !item.children?.length"
                  @update:model-value="handleDirectoryToggle(item)"
                  color="primary"
                  :label="switchLabel(item, item.enabled)"
                  hide-details
              ></v-switch>
            </template>

            <template v-slot:expanded-row="{ columns, item }">
              <tr v-if="item.children" class="bg-gray-50">
                <td :colspan="columns.length">
                  <v-table>
                    <thead class="bg-surface-light">
                    <tr>
                      <th>功能代碼</th>
                      <th>功能名稱</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="child in item.children" :key="child.id">
                      <td>{{ child.meta.functionId }}</td>
                      <td>{{ child.meta.label }}</td>
                      <td>
                        <v-switch
                            v-model="child.enabled"
                            @update:model-value="handleChildToggle(item)"
                            color="primary"
                            :label="child.enabled ? '已啟用' : '已停用'"
                            hide-details
                        ></v-switch>
                      </td>
                    </tr>
                    </tbody>
                  </v-table>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>

        <v-btn block class="bg-primary text-none" variant="elevated" @click="login">Login</v-btn>

      </v-card>

    </v-container>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, reactive} from 'vue'
import menus from '@/core/menu/menu.json';

interface MenuMeta {
  directory?: boolean
  icon: string
  label: string
  functionId?: string
}

interface MenuItem {
  id: number
  meta: MenuMeta
  children?: MenuItem[]
  path?: string
  enabled?: boolean
}

const menuData = [
  ...menus
]

const menuItems = ref<MenuItem[]>(menuData.map(menu => ({
  ...menu,
  enabled: true,
  children: menu.children ? menu.children.map(child => ({
    ...child,
    enabled: true
  })) : undefined
})))

const headers = computed(() => [
  { title: '選單類型', key: 'meta.directory'},
  { title: '名稱', key: 'meta.label' },
  { title: '功能代號', key: 'meta.functionId' },
  { title: '操作', key: 'actions', sortable: false },
])

// 直接設定所有項目為展開狀態
// const allExpanded = computed(() => menuItems.value.map(item => item.id))

// 處理目錄的開關邏輯
const handleDirectoryToggle = (item: MenuItem) => {
  if (item.meta.directory && item.children) {
    // 目錄開關時，子項目跟著聯動
    item.children.forEach(child => {
      child.enabled = item.enabled
    })
  }
}

// 處理子項目的開關邏輯
const handleChildToggle = (parent: MenuItem) => {
  if (parent.meta.directory) {
    // 如果有子項目全部關閉，父目錄也關閉
    parent.enabled = parent.children?.some(c => c.enabled) || false
  }
}

const switchLabel = (v: MenuItem, enabled: boolean | undefined) => {
  const type = v.meta.directory ? '目錄' : '功能'
  const status = enabled ? '啟用' : '停用'
  return `${type}${status}`
}

const combobox = reactive({
  select: ['員工group'],
  items: ['員工group','駐點group',"管理員group"]
})

const login = async () => {

}

</script>