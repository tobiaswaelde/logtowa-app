<template>
  <v-app>
    <navbar />
    <projects-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>
