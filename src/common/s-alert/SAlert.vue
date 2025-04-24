<template>
  <v-dialog
      v-model="visible"
      max-width="400px"
      content-class="align-self-start"
  >
    <v-alert :type="type" density="comfortable">
      {{ message }}
    </v-alert>
  </v-dialog>
</template>
<script setup lang="ts">
import { useSAlertStore } from '@/store/s-alert-store';
import { storeToRefs } from 'pinia';
const alertStore = useSAlertStore();
const { visible, message, type } = storeToRefs(alertStore);
</script>
