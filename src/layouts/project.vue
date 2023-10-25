<template>
  <v-app>
    <navbar>
      <template v-slot:actions>
        <lazy-show-implementation-dialog />

        <v-btn icon>
          <IconDownload />
        </v-btn>

        <lazy-edit-project-dialog />
        <lazy-delete-project-dialog />
      </template>
    </navbar>
    <projects-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { IconCode, IconDownload } from '@tabler/icons-vue';
</script>
