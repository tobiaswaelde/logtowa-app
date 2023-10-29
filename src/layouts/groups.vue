<template>
  <v-app>
    <navbar>
      <template v-slot:actions>
        <lazy-add-group-dialog />
      </template>
    </navbar>
    <apps-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
