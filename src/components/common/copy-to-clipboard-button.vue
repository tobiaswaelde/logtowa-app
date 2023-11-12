<template>
  <v-btn
    v-if="clipboard.isSupported"
    icon
    size="small"
    variant="elevated"
    title="Copy to clipboard"
    @click="handleClick"
  >
    <IconClipboardCopy :size="20" />
  </v-btn>
</template>

<script setup lang="ts">
import { IconClipboardCopy } from '@tabler/icons-vue';
import { useClipboard } from '@vueuse/core';

const props = defineProps<{ value: string }>();

const clipboard = useClipboard();

const handleClick = () => {
  clipboard.copy(props.value);
};
</script>
