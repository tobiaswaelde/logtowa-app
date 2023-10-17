<template>
  <div>Group</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id as string;

console.log(id);
</script>
