<template>
  <v-list
    density="default"
    select-strategy="classic"
    v-model:selected="filter.levels"
  >
    <v-list-subheader>Filter Levels</v-list-subheader>
    <v-list-item v-for="level of LOG_LEVELS" :key="level" :value="level">
      <template v-slot:prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn
            :model-value="isActive"
            :color="getColorFromLevel(level)"
          />
        </v-list-item-action>
      </template>

      <v-list-item-title>
        <LogLevelChip :value="level" />
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import LogLevelChip from '@/components/ui/chips/log-level-chip.vue';
import { useLogsFilterStore } from '@/store/log-filter';
import { getColorFromLevel } from '@/util/color';
import { LOG_LEVELS } from '@/config/levels';

const logsFilterStore = useLogsFilterStore();
const { filter } = logsFilterStore;
</script>
