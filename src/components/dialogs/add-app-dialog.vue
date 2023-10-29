<template>
  <v-tooltip text="Add App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconCubePlus />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent :max-width="500">
        <v-card>
          <v-card-title>Create App</v-card-title>
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
import { IconExclamationCircle, IconCubePlus } from '@tabler/icons-vue';
import { CreateAppDto } from '@/types/app';

const router = useRouter();

const { createApp } = useApps();
const { group } = storeToRefs(useGroups());

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const data = reactive<Omit<CreateAppDto, 'group'>>({
  name: '',
  repoUrl: '',
});

const handleClose = () => {
  data.name = '';
  data.repoUrl = '';
  dialogOpen.value = false;
  error.value = false;
};
const handleSave = async () => {
  if (!group.value?.id) return;

  const createdProject = await createApp({
    ...data,
    group: group.value.id,
  });
  if (createdProject) {
    router.push(`/apps/${createdProject.id}`);
    handleClose();
  } else {
    error.value = true;
  }
};
</script>
