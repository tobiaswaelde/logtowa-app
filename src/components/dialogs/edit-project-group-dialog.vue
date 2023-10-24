<template>
  <v-tooltip text="Edit Project Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconEdit />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent :max-width="500">
        <v-card>
          <v-card-title>Edit Project Group</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col :cols="12" v-if="error">
                <v-alert
                  type="error"
                  variant="elevated"
                  title="Something went wrong"
                >
                  <template v-slot:prepend>
                    <IconExclamationCircle />
                  </template>
                </v-alert>
              </v-col>
              <v-col :cols="12">
                <v-text-field
                  v-model="data.name"
                  variant="outlined"
                  density="compact"
                  label="Name"
                  hint="The name of the project group"
                  required
                  :maxlength="255"
                />
              </v-col>
            </v-row>
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
import { IconEdit, IconExclamationCircle } from '@tabler/icons-vue';
import { UpdateProjectGroupDto } from '../../types/project-group';

const projectGroupsStore = useProjectGroups();
const { updateProjectGroup } = projectGroupsStore;
const { projectGroup } = storeToRefs(projectGroupsStore);

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const data = reactive<UpdateProjectGroupDto>({
  name: projectGroup.value?.name ?? '',
});

watch([projectGroup], () => {
  if (projectGroup.value) {
    data.name = projectGroup.value.name;
  }
});

const handleClose = () => {
  data.name = projectGroup.value?.name ?? '';
  dialogOpen.value = false;
  error.value = false;
};
const handleSave = async () => {
  const id = projectGroup.value?.id;
  if (!id) return;

  const updatedGroup = await updateProjectGroup(id, data);
  if (updatedGroup) {
    handleClose();
    projectGroup.value = updatedGroup;
  } else {
    error.value = true;
  }
};
</script>
