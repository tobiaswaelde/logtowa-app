<template>
  <project-groups-breadcrumb />
  <v-divider />
  <v-container>
    <div v-if="projectGroups.length > 0">
      <v-row>
        <v-col
          v-for="projectGroup in projectGroups"
          :key="projectGroup.id"
          :cols="12"
          :md="6"
          :xl="4"
        >
          <project-group-item :projectGroup="projectGroup" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <em>No groups or projects yet.</em>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const projectGroupsStore = useProjectGroups();
const { projectGroups, projectGroup } = storeToRefs(projectGroupsStore);

onBeforeMount(async () => {
  projectGroup.value = null;
  useHead({ title: 'Project Groups' });
});
</script>
