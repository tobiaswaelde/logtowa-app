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
                  v-model="name"
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
import { IconEdit } from '@tabler/icons-vue';
import { ProjectGroup } from '../../types/project-group';

const route = useRoute();
const http = useHttp();

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const name = ref<string>('');

watch([dialogOpen], async () => {
  if (dialogOpen.value === true && route.name === 'groups-id') {
    const id = route.params.id;
    const res = await http.get<ProjectGroup>(`/api/project-groups/${id}`);
    if (res) {
      name.value = res.data.name;
    }
  }
});

const handleClose = () => {
  name.value = '';
  dialogOpen.value = false;
  error.value = false;
};

const handleSave = async () => {
  try {
    const id = route.params.id;
    await http.patch<ProjectGroup>(`/api/project-groups/${id}`, {
      name: name.value,
    });
    window.location.reload();
    handleClose();
  } catch (err) {
    error.value = true;
  }
};
</script>
