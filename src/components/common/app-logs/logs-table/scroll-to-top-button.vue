<template>
  <div style="position: absolute; right: 8px; bottom: 8px">
    <v-scale-transition :hide-on-leave="false" mode="in-out">
      <v-btn v-show="visible" icon color="error" @click="emit('click')">
        <IconArrowUp />
      </v-btn>
    </v-scale-transition>
  </div>
</template>

<script setup lang="ts">
import { IconArrowUp } from '@tabler/icons-vue';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['click']);
</script>
