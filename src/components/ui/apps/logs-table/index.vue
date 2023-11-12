<template>
  <v-data-table-server
    :height="tableHeight - PAGINATION_HEIGHT"
    :items-length="0"
  >
  </v-data-table-server>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { onBeforeUnmount } from 'vue';

const props = defineProps<{ tableHeight: number }>();

const PAGINATION_HEIGHT = 48;
//

const wrapper = ref<HTMLDivElement>();

// useResizeObserver(wrapper, (entries) => {
//   const { height } = entries[0].contentRect;
//   console.log(height);
//   tableHeight.value = height - PAGINATION_HEIGHT;
// });

// const handleResize = () => {
//   console.log('handle resize');
//   if (wrapper.value) {
//     const height = wrapper.value.clientHeight - PAGINATION_HEIGHT;
//     tableHeight.value = height;
//   }
// };
// onMounted(() => {
//   wrapper.value?.addEventListener('resize', handleResize);
// });
// onBeforeUnmount(() => {
//   wrapper.value?.removeEventListener('resize', handleResize);
// });
</script>
