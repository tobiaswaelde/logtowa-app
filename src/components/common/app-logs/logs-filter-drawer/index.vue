<template>
  <v-navigation-drawer
    location="end"
    temporary
    :elevation="3"
    :width="350"
    v-model="filterDrawerOpen"
  >
    <v-row style="padding: 16px 8px">
      <v-col :cols="12">
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
            </v-list-item>
          </template>
        </v-select>
      </v-col>
      <v-col :cols="12">
        <v-text-field
          label="Filter Scope"
          variant="outlined"
          density="comfortable"
          hide-details
          v-model="filter.scope"
        />
      </v-col>
      <v-col :cols="12">
        <v-text-field
          label="Filter Message"
          variant="outlined"
          density="comfortable"
          hide-details
          v-model="filter.message"
        />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { IconFilter } from '@tabler/icons-vue';

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

const { filterDrawerOpen, filter } = storeToRefs(useLogs());
</script>
