<template>
  <v-alert type="error" variant="elevated" density="compact" :title="title">
    <template v-slot:prepend>
      <IconExclamationCircle />
    </template>
    <template v-slot:text v-if="text">
      <span :class="{ 'font-monospace select-text': debug }">{{ text }}</span>
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { IconExclamationCircle } from '@tabler/icons-vue';

defineProps<{ title: string; text?: string; debug?: boolean }>();
</script>
