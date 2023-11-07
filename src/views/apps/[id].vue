<template>
  <v-main>
    <div>app: {{ id }}</div>
  </v-main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const id = computed(() => route.params.id as string);
</script>
