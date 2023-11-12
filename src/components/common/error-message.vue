<template>
  <v-alert type="error" variant="elevated" density="compact" :title="value">
    <template v-slot:prepend>
      <IconExclamationCircle />
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { IconExclamationCircle } from '@tabler/icons-vue';

defineProps<{ value: string }>();
</script>
