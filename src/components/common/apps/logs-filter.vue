<template>
  <v-row style="margin: 0">
    <v-col :cols="4" style="padding: 8px">
      <v-select
        label="Filter Level"
        variant="outlined"
        density="comfortable"
        chips
        multiple
        :items="levels"
        hide-details
        v-model="filter.levels"
      >
        <template v-slot:chip="{ props, item }">
          <log-level-chip v-bind="props" :value="item.value" />
        </template>
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="undefined">
            <log-level-chip :value="item.value" v-bind="props" />
            <template v-slot:prepend>
              <v-checkbox-btn
                :value="filter.levels.includes(item.value)"
                :true-icon="IconSquareCheck"
                :false-icon="IconSquare"
              />
            </template>
          </v-list-item>
        </template>
      </v-select>
    </v-col>

    <v-col :cols="4" style="padding: 8px">
      <v-text-field
        label="Filter Scope"
        variant="outlined"
        density="comfortable"
        hide-details
        v-model="filter.scope"
      />
    </v-col>

    <v-col :cols="4" style="padding: 8px">
      <v-text-field
        label="Filter Message"
        variant="outlined"
        density="comfortable"
        hide-details
        v-model="filter.message"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { IconSquare, IconSquareCheck } from '@tabler/icons-vue';
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

const { filter } = storeToRefs(useLogs());
</script>
