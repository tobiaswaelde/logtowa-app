<template>
  <v-chip density="comfortable" variant="flat" :color="color">
    {{ value }}
  </v-chip>
</template>

<script setup lang="ts">
import { getColorFromLevel } from '@/util/color';

const props = defineProps<{ value: string }>();

const color = computed(() => {
  return getColorFromLevel(props.value);
});
</script>
