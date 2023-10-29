<template>
  <v-tooltip text="Add Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconFolderPlus />
      </v-btn>
      <v-dialog v-model="dialogOpen" persistent :max-width="500">
        <v-card>
          <v-card-title>Create Group</v-card-title>
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
                  hint="The name of the group"
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
import { IconExclamationCircle, IconFolderPlus } from '@tabler/icons-vue';
import { CreateGroupDto } from '@/types/group';

const router = useRouter();

const { createGroup } = useGroups();
const { projectGroup } = storeToRefs(useGroups());

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

const data = reactive<CreateGroupDto>({
  name: '',
});

const handleClose = () => {
  data.name = '';
  dialogOpen.value = false;
  error.value = false;
};
const handleSave = async () => {
  const createdGroup = await createGroup({
    ...data,
    parent: projectGroup.value?.id,
  });
  if (createdGroup) {
    router.push(`/groups/${createdGroup.id}`);
    handleClose();
  } else {
    error.value = true;
  }
};
</script>
