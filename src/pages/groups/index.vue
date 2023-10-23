<template>
  <project-groups-breadcrumb />
  <v-divider />
  <v-container>
    <div v-if="groups.length > 0">
      <v-row>
        <v-col
          v-for="projectGroup in groups"
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
import compareBy from 'compare-by';

const projectGroupsStore = useProjectGroups();
const { projectGroups } = projectGroupsStore;
const { projectGroup } = storeToRefs(projectGroupsStore);

const groups = computed(() =>
  Array.from(projectGroups.values())
    .filter((x) => !x.parent)
    .sort(compareBy({ key: 'name' })),
);

onBeforeMount(() => {
  useHead({ title: 'Projects' });
  projectGroup.value = null;
});
</script>
