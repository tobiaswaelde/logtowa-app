<template>
  <div style="display: flex; flex-direction: row">
    <div style="margin: 4px 8px">
      <span class="text-medium-emphasis">
        <span>APP: </span>
        <span class="online">{{ appVersion }}</span>
      </span>
    </div>
    <div style="margin: 4px 8px">
      <span class="text-medium-emphasis">
        <span>API: </span>
        <span :class="{ online: apiVersion, offline: !apiVersion }">
          {{ apiVersion ?? 'offline' }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import pjson from '@/../package.json';
import { useHttp } from '@/composables/http';

const appVersion = `v${pjson.version}`;
const apiVersion = ref<string | null>(null);

onBeforeMount(async () => {
  const http = useHttp();
  try {
    const res = await http.get('/api/health');
    apiVersion.value = `v${res.data.version}`;
  } catch (err) {
    apiVersion.value = null;
  }
});
</script>

<style lang="scss" scoped>
.online {
  color: #98c379;
}
.offline {
  color: #e06c75;
}
</style>
