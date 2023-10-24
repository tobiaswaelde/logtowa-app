<template>
  <v-app>
    <navbar>
      <template v-slot:actions>
        <lazy-add-project-dialog />
        <lazy-add-project-group-dialog />
        <lazy-edit-project-group-dialog />
        <lazy-delete-project-group-dialog />
      </template>
    </navbar>
    <projects-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
