<template>
  <v-app-bar density="comfortable" color="primary">
    <v-app-bar-nav-icon @click="appStore.toggleDrawer">
      <IconMenu2 />
    </v-app-bar-nav-icon>

    <v-app-bar-title>CloudLogger</v-app-bar-title>
    <v-spacer />

    <!-- <v-btn to="/groups">Projects</v-btn> -->

    <!-- <lazy-add-project-group-dialog
      v-if="showRootGroupButtons || showGroupButtons"
    />
    <lazy-add-project-dialog v-if="showGroupButtons" />
    <lazy-edit-project-group-dialog v-if="showGroupButtons" />
    <lazy-edit-project-dialog v-if="showProjectButtons" />
    <lazy-delete-project-group-dialog v-if="showGroupButtons" />
    <lazy-delete-project-dialog v-if="showProjectButtons" /> -->
  </v-app-bar>
</template>

<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue';
import { useAppStore } from '../../stores/app';
const appStore = useAppStore();

const route = useRoute();

const showGroupButtons = computed(() => {
  if (route.name === 'groups-id') return true;
  return false;
});
const showRootGroupButtons = computed(() => {
  if (route.name === 'groups') return true;
  return false;
});
const showProjectButtons = computed(() => {
  if (route.name === 'projects-id') return true;
  return false;
});
</script>
