<template>
  <v-navigation-drawer
    location="end"
    temporary
    :elevation="3"
    :width="350"
    v-model="drawerOpen"
  >
    <v-list
      density="default"
      select-strategy="classic"
      v-model:selected="filter.levels"
      :key="key"
    >
      <v-list-subheader>Filter Levels</v-list-subheader>
      <v-list-item v-for="level of levels" :key="level" :value="level">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn
              :model-value="isActive"
              :color="getColorFromLevel(level)"
            />
          </v-list-item-action>
        </template>

        <v-list-item-title>
          <log-level-chip :value="level" />
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-row style="padding: 16px">
      <v-col :cols="12">
        <v-list-subheader>Filter Scopes</v-list-subheader>
        <v-text-field
          label="Filter Scope"
          variant="outlined"
          density="comfortable"
          hide-details
          v-model="filter.scope"
          :key="key"
        />
      </v-col>
      <v-col :cols="12">
        <v-list-subheader>Filter Messages</v-list-subheader>
        <v-text-field
          label="Filter Message"
          variant="outlined"
          density="comfortable"
          hide-details
          v-model="filter.message"
          :key="key"
        />
      </v-col>
      <v-col :cols="12">
        <v-btn
          width="100%"
          color="error"
          variant="outlined"
          @click="() => reset()"
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
import LogLevelChip from '../../common/project-log/log-level-chip.vue';
import { getColorFromLevel } from '@/util/color';
import { IconRotate2 } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useLogsFilter } from '../../../store/logs-filter';

const filterStore = useLogsFilter();
const { reset, filter } = filterStore;
const { drawerOpen } = storeToRefs(filterStore);

const key = ref<number>(0);
onMounted(() => {
  key.value++;
});

const levels = [
  'error',
  'warn',
  'info',
  'success',
  'http',
  'verbose',
  'debug',
  'silly',
];
</script>
