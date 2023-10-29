<template>
  <v-chip density="comfortable" variant="flat" :color="color">
    {{ value }}
  </v-chip>
</template>

<script setup lang="ts">
//@ts-ignore
import colors from 'vuetify/lib/util/colors';

const props = defineProps<{ value: string }>();

const color = computed(() => {
  switch (props.value) {
    case 'error':
      return colors.red.base;
    case 'success':
      return colors.green.base;
    case 'warn':
      return colors.orange.darken1;
    case 'info':
      return colors.blue.base;
    case 'http':
      return colors.pink.base;
    case 'verbose':
      return colors.cyan.darken1;
    case 'debug':
      return colors.teal.base;
    case 'silly':
      return colors.brown.base;

    default:
      return undefined;
  }
});
</script>
