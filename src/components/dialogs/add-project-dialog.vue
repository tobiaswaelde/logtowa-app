<template>
  <v-tooltip text="Add Project" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconCubePlus />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent>
        <v-card>
          <v-card-title>Create Project</v-card-title>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconCubePlus } from '@tabler/icons-vue';

const dialogOpen = ref<boolean>(false);
</script>
