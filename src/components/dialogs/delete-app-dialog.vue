<template>
  <v-tooltip text="Delete App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconTrash />
      </v-btn>
      <v-dialog v-model="dialogOpen">
        <v-card>
          <v-card-title>Delete App</v-card-title>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue';

const dialogOpen = ref<boolean>(false);
</script>
