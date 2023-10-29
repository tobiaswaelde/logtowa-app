<template>
  <v-tooltip text="Edit App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconEdit />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent :max-width="500">
        <v-card>
          <v-card-title>Edit App</v-card-title>
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
                  hint="The name of the app"
                  required
                  :maxlength="255"
                />
              </v-col>
              <v-col :cols="12">
                <v-text-field
                  v-model="data.repoUrl"
                  variant="outlined"
                  density="compact"
                  label="Repository URL"
                  hint="The URL to the app repository"
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
import { UpdateAppDto } from '@/types/app';

const appsStore = useApps();
const { updateApp } = appsStore;
const { app } = storeToRefs(appsStore);

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const data = reactive<UpdateAppDto>({
  name: app.value?.name ?? '',
  repoUrl: app.value?.repoUrl ?? '',
});

watch([app], () => {
  if (app.value) {
    data.name = app.value.name;
    data.repoUrl = app.value.repoUrl;
  }
});

const handleClose = () => {
  data.name = app.value?.name ?? '';
  data.repoUrl = app.value?.repoUrl ?? '';
  dialogOpen.value = false;
  error.value = false;
};
const handleSave = async () => {
  const id = app.value?.id;
  if (!id) return;

  const updatedApp = await updateApp(id, data);
  if (updatedApp) {
    handleClose();
    app.value = updatedApp;
  } else {
    error.value = true;
  }
};
</script>
