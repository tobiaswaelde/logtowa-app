<template>
  <v-app>
    <navbar>
      <template v-slot:actions>
        <lazy-add-app-dialog />
        <lazy-add-group-dialog />
        <lazy-edit-group-dialog />
        <lazy-delete-group-dialog />
      </template>
    </navbar>
    <apps-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
