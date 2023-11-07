<template>
  <v-navigation-drawer :width="300" permanent v-model="appStore.drawerOpen">
    <v-list density="comfortable">
      <v-list-item title="Dashboard" :to="{ name: 'dashboard' }">
        <template v-slot:prepend>
          <IconHome2 :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>
      <v-list-item title="Apps" :to="{ name: 'groups' }">
        <template v-slot:prepend>
          <IconCube :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <AppsList />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import AppsList from './apps-list.vue';
import { IconHome2, IconCube } from '@tabler/icons-vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>
