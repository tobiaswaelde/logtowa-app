<template>
  <groups-breadcrumb v-if="group" :group="group" />
  <v-divider />
  <v-container>
    <div v-if="group">
      <v-row v-if="children.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Groups</h2>
        </v-col>
        <v-col
          v-for="subgroup in children"
          :key="subgroup.id"
          :cols="12"
          :md="6"
          :xl="4"
        >
          <group-item :group="subgroup" />
        </v-col>
      </v-row>
      <v-row v-if="apps.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Projects</h2>
        </v-col>
        <v-col v-for="app in apps" :key="app.id" :cols="12" :md="6" :xl="4">
          <app-item :app="app" />
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
import { Group } from '@/types/group';

definePageMeta({ layout: 'group' });

const route = useRoute();
const id = route.params.id as string;

const groupsStore = useGroups();
const { getGroup } = groupsStore;
const { group } = storeToRefs(groupsStore);

const children = computed(
  () => group.value?.children.sort(compareBy({ key: 'name' })) ?? [],
);
const apps = computed(
  () => group.value?.apps.sort(compareBy({ key: 'name' })) ?? [],
);

const update = async (updatedGroup?: Group | null) => {
  group.value = updatedGroup ?? null;
  useHead({
    title: updatedGroup?.name,
  });
};

onBeforeMount(async () => {
  const g = await getGroup(id);
  await update(g);
});
watch([group], async () => {
  await update(group.value);
});
</script>
