<template>
  <v-app>
    <navbar />
    <drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>
