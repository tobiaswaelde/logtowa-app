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
              <v-card-actions> python implementation </v-card-actions>
            </v-window-item>
            <v-window-item value="java">
              <v-card-actions> java implementation </v-card-actions>
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
import { IconCode } from '@tabler/icons-vue';
import { Project } from '../../types/project';

const dialogOpen = ref<boolean>(false);
const tab = ref<'node' | 'python' | 'java'>('node');
const data = reactive({
  codeNode: '',
});

const config = useRuntimeConfig();
const { project } = storeToRefs(useProjects());

onBeforeMount(async () => {
  if (!project.value) return;
  data.codeNode = await getNodeImplementation(project.value);
});

watch([project], async () => {
  if (!project.value) return;
  data.codeNode = await getNodeImplementation(project.value);
});

const getNodeImplementation = async (project: Project): Promise<string> => {
  const apiEndpoint = config.public.apiUrl;
  const apiToken = config.public.apiToken;
  const projectKey = project.id;

  const res = `import { CloudLoggerTransport } from 'cloud-logger-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = '${apiEndpoint}';
const API_TOKEN = '${apiToken}';
const PROJECT_KEY = '${projectKey}';

// create the transport
const cloudLoggerTransport = new CloudLoggerTransport({
  host: HOST,
  token: API_TOKEN,
  projectKey: PROJECT_KEY,
});

// create the logger
const logger = winston.createLogger({
	transports: [ cloudLoggerTransport ],
});`;

  return res;
};
</script>
