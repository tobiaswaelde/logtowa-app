<template>
  <Navbar>
    <template v-slot:actions>
      <!-- <template v-if="route.name === 'dashboard'">
        dashboard links
      </template> -->
      <template v-if="route.name === 'groups'">
        <AddGroupDialog />
      </template>
      <template v-if="route.name === 'group'">
        <AddAppDialog :group-id="(route.params.id as string)" />
        <AddGroupDialog :group-id="(route.params.id as string)" />
        <EditGroupDialog :id="(route.params.id as string)" />
        <DeleteGroupDialog :id="(route.params.id as string)" />
      </template>
      <template v-if="route.name === 'app'">
        <ToggleListeningButton />
        <ToggleFilterDrawerButton />
        <ShowImplementationDialog :id="(route.params.id as string)" />
        <EditAppDialog :id="(route.params.id as string)" />
        <DeleteAppDialog :id="(route.params.id as string)" />
      </template>
    </template>
  </Navbar>

  <MainDrawer />

  <router-view />
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/layout/drawers/main-drawer/index.vue';
import AddAppDialog from '@/components/dialogs/add-app-dialog.vue';
import AddGroupDialog from '@/components/dialogs/add-group-dialog.vue';
import EditGroupDialog from '@/components/dialogs/edit-group-dialog.vue';
import EditAppDialog from '@/components/dialogs/edit-app-dialog.vue';
import DeleteGroupDialog from '@/components/dialogs/delete-group-dialog.vue';
import DeleteAppDialog from '@/components/dialogs/delete-app-dialog.vue';
import ToggleFilterDrawerButton from '@/components/layout/drawers/logs-filter-drawer/toggle-button.vue';
import ToggleListeningButton from '@/components/ui/apps/toggle-listening-button.vue';
import ShowImplementationDialog from '@/components/dialogs/show-implementation-dialog.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
