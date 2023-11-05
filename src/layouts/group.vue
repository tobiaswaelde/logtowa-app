<template>
  <navbar>
    <template v-slot:actions>
      <add-app-dialog />
      <add-group-dialog />
      <edit-group-dialog />
      <delete-group-dialog />
    </template>
  </navbar>

  <main-drawer />

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '../components/layout/navbar.vue';
import MainDrawer from '../components/drawers/main-drawer/index.vue';
import AddAppDialog from '../components/dialogs/add-app-dialog.vue';
import AddGroupDialog from '../components/dialogs/add-group-dialog.vue';
import EditGroupDialog from '../components/dialogs/edit-group-dialog.vue';
import DeleteGroupDialog from '../components/dialogs/delete-group-dialog.vue';
</script>
