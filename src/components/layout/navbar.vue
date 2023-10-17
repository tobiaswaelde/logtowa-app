<template>
  <v-app-bar density="comfortable" color="primary">
    <v-app-bar-nav-icon @click="appStore.toggleDrawer">
      <IconMenu2 />
    </v-app-bar-nav-icon>

    <v-app-bar-title>CloudLogger</v-app-bar-title>
    <v-spacer />

    <v-btn to="/groups">Projects</v-btn>

    <v-tooltip text="Add Project Group" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <IconFolderPlus />
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="Add Project" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <IconCubePlus />
        </v-btn>
      </template>
    </v-tooltip>
  </v-app-bar>
</template>

<script setup lang="ts">
import { IconMenu2, IconFolderPlus, IconCubePlus } from '@tabler/icons-vue';
import { useAppStore } from '../../stores/app';
const appStore = useAppStore();

const route = useRoute();
console.log({ route });
</script>
