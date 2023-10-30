<template>
  <v-chip density="comfortable" variant="flat" :color="color">
    {{ value }}
  </v-chip>
</template>

<script setup lang="ts">
import { COLORS } from '../../../config/colors';

const props = defineProps<{ value: string }>();

const color = computed(() => {
  switch (props.value) {
    case 'error':
      return COLORS.red;
    case 'success':
      return COLORS.green;
    case 'warn':
      return COLORS.yellow;
    case 'info':
      return COLORS.blue;
    case 'http':
      return COLORS.purple;
    case 'verbose':
      return COLORS.text;
    case 'debug':
      return COLORS.orange;
    case 'silly':
      return COLORS.gray;

    default:
      return undefined;
  }
});
</script>
