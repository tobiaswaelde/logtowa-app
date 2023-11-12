<template>
  <v-dialog v-model="open" persistent :max-width="500">
    <v-card>
      <v-card-title>Errors</v-card-title>
      <v-divider />
      <v-card-text>
        <!-- The following errors need to be fixed in order to display the app: -->
        <!-- <div style="padding-left: 20px">
          <ul class="font-monospace">
            <li v-for="error of errors" :key="error" class="font-monospace">
              {{ error }}
            </li>
          </ul>
        </div> -->

        <v-row>
          <v-col :cols="12" v-for="error of errors" :key="error">
            <ErrorMessage title="Error" :text="error" debug />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import ErrorMessage from '../common/error-message.vue';
import { onBeforeMount, ref } from 'vue';

const open = ref<boolean>(true);
const errors = ref<string[]>([]);

onBeforeMount(() => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    errors.value.push(`Environment Variable 'VITE_API_BASE_URL' is not set.`);
  }
  if (!import.meta.env.VITE_API_TOKEN) {
    errors.value.push(`Environment Variable 'VITE_API_TOKEN' is not set.`);
  }
  if (!import.meta.env.VITE_SOCKET_TOKEN) {
    errors.value.push(`Environment Variable 'VITE_SOCKET_TOKEN' is not set.`);
  }

  open.value = errors.value.length > 0;
});
</script>
