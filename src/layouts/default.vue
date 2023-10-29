<template>
  <v-app>
    <navbar />
    <apps-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>
