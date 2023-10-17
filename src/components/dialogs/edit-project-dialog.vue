<template>
  <v-tooltip text="Edit Project" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconEdit />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent>
        <v-card>
          <v-card-title>Edit Project</v-card-title>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconEdit } from '@tabler/icons-vue';

const dialogOpen = ref<boolean>(false);
</script>
