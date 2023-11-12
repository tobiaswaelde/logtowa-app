<template>
  <v-app style="overflow: scroll">
    <Suspense>
      <router-view />
    </Suspense>
    <ErrorOverlay />
  </v-app>
</template>

<script setup lang="ts">
import ErrorOverlay from '@/components/layout/error-overlay.vue';
</script>
