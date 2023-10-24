<template>
  <v-tooltip text="Edit Project" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconEdit />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent>
        <v-card>
          <v-card-title>Edit Project</v-card-title>
          <v-divider />
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            rerum nam. Recusandae omnis soluta fuga amet reiciendis tempora
            nihil, consequuntur voluptatem obcaecati repellendus quia et
            doloremque modi ex dolor incidunt?
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="handleClose">Cancel</v-btn>
            <v-btn variant="outlined" color="success" @click="handleSave">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconEdit } from '@tabler/icons-vue';
import { UpdateProjectDto } from '../../types/project';

const projectsStore = useProjects();
const {} = projectsStore;
const { project } = storeToRefs(projectsStore);

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const data = reactive<UpdateProjectDto>({
  name: project.value?.name ?? '',
  repoUrl: project.value?.repoUrl ?? '',
});

const handleClose = () => {
  data.name = project.value?.name ?? '';
  data.repoUrl = project.value?.repoUrl ?? '';
  dialogOpen.value = false;
  error.value = false;
};
const handleSave = async () => {
  const id = project.value?.id;
  if (!id) return;

  // const updatedGroup = await updateProjectGroup(id, data);
  // if (updatedGroup) {
  //   handleClose();
  //   projectGroup.value = updatedGroup;
  // } else {
  //   error.value = true;
  // }
};
</script>
