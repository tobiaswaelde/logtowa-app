<template>
  <v-navigation-drawer :width="300" v-model="appStore.drawerOpen">
    <v-list v-model:opened="open">
      <v-list-subheader>Projects</v-list-subheader>
      <lazy-project-group-list-item
        v-for="projectGroup in projectGroups"
        :key="projectGroup.id"
        :value="projectGroup.id"
        :project-group="projectGroup"
      />
    </v-list>

    <div style="padding: 0px 8px; width: 100%">
      <v-btn style="width: 100%" variant="outlined" color="primary">
        <IconPlus />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';

const appStore = useAppStore();
const { projectGroups } = storeToRefs(useProjectGroups());

const open = ref<string[]>([]);
</script>
