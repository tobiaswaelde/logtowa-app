<template>
  <v-navigation-drawer
    :width="500"
    permanent
    location="end"
    :model-value="selectedLog !== null"
    color="background"
  >
    <div style="position: relative">
      <div style="position: absolute; top: 8px; right: 8px">
        <v-btn
          icon
          variant="flat"
          size="small"
          @click="selectedLog = null"
          color="background"
        >
          <IconX />
        </v-btn>
      </div>

      <v-container v-if="selectedLog !== null">
        <v-row>
          <v-col :cols="12">
            <h3 class="text-h5">Log Information</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="12">
            <h4>ID</h4>
            <span class="font-monospace select">
              {{ selectedLog.id }}
            </span>
          </v-col>

          <v-col :cols="6">
            <h4>Date</h4>
            <span class="font-monospace">
              {{ moment(selectedLog.timestamp).format('YYYY-MM-DD') }}
            </span>
          </v-col>
          <v-col :cols="6">
            <h4>Time</h4>
            <span class="font-monospace">
              {{ moment(selectedLog.timestamp).format('HH:mm:ss.SSS') }}
            </span>
          </v-col>

          <v-col :cols="6">
            <h4>Level</h4>
            <log-level-chip :value="selectedLog.level" />
          </v-col>

          <v-col :cols="6">
            <h4>Scope</h4>
            <span class="font-monospace">
              {{ selectedLog.scope }}
            </span>
          </v-col>

          <v-col :cols="12">
            <h4>Message</h4>
            <span class="font-monospace">
              {{ selectedLog.message }}
            </span>
          </v-col>
          <v-col :cols="12">
            <h4>Meta</h4>
            <pre v-highlightjs>
              <code class='json'>{{ selectedLog?.meta }}</code>
            </pre>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import LogLevelChip from '../../common/project-log/log-level-chip.vue';
import { IconX } from '@tabler/icons-vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useLogs } from '../../../store/logs';

const { selectedLog } = storeToRefs(useLogs());
</script>
