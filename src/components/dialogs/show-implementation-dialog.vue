<template>
  <v-tooltip text="Show implementation" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconCode />
      </v-btn>

      <v-dialog v-model="state.open" :max-width="800">
        <v-card>
          <v-card-title>How to use</v-card-title>
          <v-divider />

          <v-tabs v-model="state.tab" density="comfortable" grow>
            <v-tab value="node"> Node </v-tab>
            <v-tab value="python"> Python </v-tab>
            <v-tab value="java"> Java </v-tab>
          </v-tabs>

          <v-window v-model="state.tab">
            <v-window-item value="node">
              <div style="position: relative">
                <pre v-highlightjs>
                  <code class='typescript'>{{ code.node }}</code>
                </pre>

                <div
                  v-if="code.node"
                  style="position: absolute; z-index: 1; right: 4px; top: 4px"
                >
                  <CopyToClipboardBtn :value="code.node" />
                </div>
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
            <v-btn @click="state.open = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import CopyToClipboardBtn from '@/components/common/copy-to-clipboard-button.vue';
import { IconCode, IconClock } from '@tabler/icons-vue';
import { reactive, onBeforeMount, onUpdated } from 'vue';
import {
  getNodeImplementation,
  getPythonImplementation,
  getJavaImplementation,
} from '@/util/implementation';

type Technology = 'node' | 'python' | 'java';

const props = defineProps<{ id: string }>();

const state = reactive<{ open: boolean; tab: Technology }>({
  open: false,
  tab: 'node',
});
const code = reactive<{ [key in Technology]: string | null }>({
  node: null,
  python: null,
  java: null,
});

const update = () => {
  const appKey = props.id;
  code.node = getNodeImplementation(appKey);
  code.python = getPythonImplementation(appKey);
  code.java = getJavaImplementation(appKey);
};

onBeforeMount(() => {
  update();
});
onUpdated(() => {
  update();
});
</script>
