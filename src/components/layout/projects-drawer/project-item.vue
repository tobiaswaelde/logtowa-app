<template>
  <v-menu v-model="contextMenuOpen" location="right center">
    <template v-slot:activator="{ props }">
      <v-list-item
        :value="value"
        :title="_project.name"
        density="compact"
        v-bind="props"
        @click.left="console.log('123')"
        @click.left.prevent="contextMenuOpen = false"
        @click.right.prevent="contextMenuOpen = true"
      >
        <template v-slot:prepend>
          <IconCube :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>
    </template>

    <v-list density="compact" style="padding: 0">
      <v-list-item title="Delete" density="compact" @click="() => {}">
        <template v-slot:prepend>
          <IconTrash :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import { IconCube, IconTrash } from '@tabler/icons-vue';
import { Project } from '../../../types/project';

const props = defineProps<{
  value: string;
  project: Project;
}>();

const http = useHttp();
const res = await http.get<Project>(`/api/projects/${props.project.id}`);

const _project = res.data;

const contextMenuOpen = ref<boolean>(false);
</script>
