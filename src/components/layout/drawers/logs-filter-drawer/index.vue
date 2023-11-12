<template>
  <v-navigation-drawer
    temporary
    location="end"
    :elevation="3"
    :width="350"
    v-model="drawerOpen"
  >
    <FilterLevels />

    <v-row style="padding: 16px">
      <v-col :cols="12">
        <FilterScope />
      </v-col>
      <v-col :cols="12">
        <FilterMessage />
      </v-col>
      <v-col :cols="12">
        <v-btn
          width="100%"
          color="error"
          variant="outlined"
          @click="() => logsFilterStore.reset()"
        >
          <template v-slot:prepend>
            <IconRotate2 :size="20" />
          </template>
          Reset Filters
        </v-btn>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import FilterLevels from './filter-levels.vue';
import FilterScope from './filter-scope.vue';
import FilterMessage from './filter-message.vue';
import { IconRotate2 } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { useLogsFilterStore } from '@/store/log-filter';

const logsFilterStore = useLogsFilterStore();

const { drawerOpen } = storeToRefs(logsFilterStore);
</script>
