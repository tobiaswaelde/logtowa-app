<template>
  <v-app>
    <navbar>
      <template v-slot:actions>
        <lazy-add-project-group-dialog />
      </template>
    </navbar>
    <projects-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
