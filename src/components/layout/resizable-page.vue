<template>
  <div v-resize="handleResize">
    <slot name="prepend"></slot>
    <div ref="dynamicDiv">
      <slot name="dynamic" :height="dynamicHeight"></slot>
    </div>
    <div ref="appendDiv">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue';

const props = defineProps<{ offset?: number; minHeight?: number }>();
defineSlots<{
  prepend?: () => any;
  dynamic: (scope: { height: number }) => any;
  append?: () => any;
}>();

const dynamicDiv = ref<HTMLDivElement>();
const appendDiv = ref<HTMLDivElement>();

const calculateDynamicHeight = () => {
  const dynamicY = dynamicDiv.value?.getBoundingClientRect().y ?? 0;
  const appendHeight = appendDiv.value?.getBoundingClientRect().height ?? 0;
  const offset = props.offset ?? 0;

  const calcHeight = window.innerHeight - dynamicY - appendHeight + offset;

  return Math.max(props.minHeight ?? 0, calcHeight);
};

const dynamicHeight = ref<number>(calculateDynamicHeight());

const handleResize = () => {
  dynamicHeight.value = calculateDynamicHeight();
};

onUpdated(() => {
  dynamicHeight.value = calculateDynamicHeight();
});
</script>
