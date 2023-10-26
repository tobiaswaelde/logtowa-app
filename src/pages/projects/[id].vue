<template>
  <project-breadcrumb v-if="project" :project="project" />
  <v-divider />
  <project-logs />
</template>

<script lang="ts" setup>
// import { Socket, io } from 'socket.io-client';

definePageMeta({ layout: 'project' });

const route = useRoute();

// const config = useRuntimeConfig();

const projectsStore = useProjects();
const { getProject } = projectsStore;
const { project } = storeToRefs(projectsStore);

onBeforeMount(async () => {
  const id = route.params.id as string;
  await getProject(id);
  useHead({ title: project.value?.name });
});

// const logs = ref<any[]>([]);

// const socket = ref<Socket>();

// onMounted(() => {
//   const KEY = '7c1e05aa-f31a-4ab2-aa39-ccbcf24a964f';
//   // if (!project.value?.id) return;
//   socket.value = io('http://localhost:3001', {
//     autoConnect: true,
//     transports: ['websocket'],
//     auth: {
//       token: config.public.socketToken,
//       projectkey: KEY,
//     },
//   })
//     .on('error', (err) => {
//       console.error(err);
//     })
//     .on('disconnect', () => {
//       console.log('disconnected');
//     })
//     .on('connect', () => {
//       console.log('connected');
//     });
//   socket.value.connect();

//   socket.value.on(KEY, (x) => {
//     logs.value.push(x);
//   });
// });
// onUnmounted(() => {
//   socket.value?.disconnect();
// });
</script>
