<template>
  <v-tooltip text="Add Project Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconFolderPlus />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent>
        <v-card>
          <v-card-title>Create Project Group</v-card-title>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconFolderPlus } from '@tabler/icons-vue';

const dialogOpen = ref<boolean>(false);
</script>
