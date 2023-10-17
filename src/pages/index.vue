<template></template>

<script setup lang="ts">
const router = useRouter();
onBeforeMount(() => {
  router.replace('/groups');
});
</script>
