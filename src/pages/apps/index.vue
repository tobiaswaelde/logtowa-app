<template>
  <div style="height: 100vh"></div>
  <div style="height: 100vh" :class="{ 'bg-error': isVisible }"></div>
  <div :ref="divRef">test</div>
</template>

<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core';

const divRef = ref<any>(null);
const isVisible = useElementVisibility(divRef);

console.log(divRef.value);
watch([divRef], () => {
  console.log(divRef.value);
});
</script>
