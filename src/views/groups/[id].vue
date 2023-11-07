<template>
  <v-main>
    <div>groups: {{ id }}</div>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id as string);
</script>
