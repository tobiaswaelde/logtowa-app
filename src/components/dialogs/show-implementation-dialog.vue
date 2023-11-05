<template>
  <v-tooltip text="Show implementation" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconCode />
      </v-btn>
      <v-dialog v-model="dialogOpen" :max-width="800">
        <v-card>
          <v-card-title>How to use</v-card-title>
          <v-divider />

          <v-tabs v-model="tab" density="comfortable" grow>
            <v-tab value="node"> Node </v-tab>
            <v-tab value="python"> Python </v-tab>
            <v-tab value="java"> Java </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="node">
              <div>
                <pre v-highlightjs>
                  <code class='typescript'>{{ data.codeNode }}</code>
                </pre>
              </div>
            </v-window-item>
            <v-window-item value="python">
              <v-card-text>
                <v-alert color="warning">
                  <template v-slot:prepend>
                    <IconClock />
                  </template>
                  Coming soon.
                </v-alert>
              </v-card-text>
            </v-window-item>
            <v-window-item value="java">
              <v-card-text>
                <v-alert color="warning">
                  <template v-slot:prepend>
                    <IconClock />
                  </template>
                  Coming soon.
                </v-alert>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="dialogOpen = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { IconCode, IconClock } from '@tabler/icons-vue';
import { App } from '@/types/app';
import { storeToRefs } from 'pinia';
import { ref, reactive, onBeforeMount, watch } from 'vue';
import { useApps } from '../../store/apps';

const dialogOpen = ref<boolean>(false);
const tab = ref<'node' | 'python' | 'java'>('node');
const data = reactive({
  codeNode: '',
});

const { app } = storeToRefs(useApps());

onBeforeMount(async () => {
  if (!app.value) return;
  data.codeNode = await getNodeImplementation(app.value);
});

watch([app], async () => {
  if (!app.value) return;
  data.codeNode = await getNodeImplementation(app.value);
});

const getNodeImplementation = async (app: App): Promise<string> => {
  const apiEndpoint = import.meta.env.VITE_API_BASE_URL;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const appKey = app.id;

  const res = `import { CloudLoggerTransport } from 'cloud-logger-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = '${apiEndpoint}';
const API_TOKEN = '${apiToken}';
const APP_KEY = '${appKey}';

// create the transport
const cloudLoggerTransport = new CloudLoggerTransport({
  host: HOST,
  token: API_TOKEN,
  appKey: APP_KEY,
});

// create the logger
const logger = winston.createLogger({
	transports: [ cloudLoggerTransport ],
});`;

  return res;
};
</script>
