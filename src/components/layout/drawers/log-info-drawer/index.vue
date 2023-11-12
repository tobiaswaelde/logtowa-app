<template>
  <v-navigation-drawer
    :width="500"
    permanent
    location="end"
    :model-value="drawerOpen"
    color="background"
  >
    <div style="position: relative">
      <CloseBtn />

      <v-container>
        <v-row>
          <v-col :cols="12">
            <h3 class="text-h5">Log Information</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12" v-if="error">
            <ErrorMessage :title="error" />
          </v-col>

          <v-col :cols="6">
            <LogInfoItem
              type="date"
              title="Date"
              :value="selectedLog?.timestamp"
            />
          </v-col>
          <v-col :cols="6">
            <LogInfoItem
              type="time"
              title="Time"
              :value="selectedLog?.timestamp"
            />
          </v-col>

          <v-col :cols="6">
            <LogInfoItem
              type="level"
              title="Level"
              :value="selectedLog?.level"
            />
          </v-col>

          <v-col :cols="6">
            <LogInfoItem
              type="scope"
              title="Scope"
              :value="selectedLog?.scope"
            />
          </v-col>

          <v-col :cols="12">
            <LogInfoItem
              type="message"
              title="Message"
              :loading="loading"
              :value="selectedLog?.message"
            />
          </v-col>
          <v-col :cols="12">
            <LogInfoItem
              type="meta"
              title="Meta"
              :loading="loading"
              :value="(selectedLog as any)?.meta ?? null"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/common/error-message.vue';
import LogInfoItem from './log-info-item.vue';
import CloseBtn from './close-button.vue';
import { useSelectedLogStore } from '@/store/selected-log';
import { storeToRefs } from 'pinia';

const selectedLogStore = useSelectedLogStore();
const { selectedLog, error, loading, drawerOpen } =
  storeToRefs(selectedLogStore);
</script>
