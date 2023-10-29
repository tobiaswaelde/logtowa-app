<template>
  <v-tooltip text="Delete Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconTrash />
      </v-btn>
      <v-dialog v-model="dialogOpen" :max-width="500">
        <v-card>
          <v-card-title>Delete Group</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col :cols="12" v-if="error">
                <v-alert
                  type="error"
                  variant="elevated"
                  title="Something went wrong"
                  density="compact"
                >
                  <template v-slot:prepend>
                    <IconExclamationCircle />
                  </template>
                </v-alert>
              </v-col>
              <v-col :cols="12">
                Dou you really want to delete the group?
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="dialogOpen = false">No</v-btn>
            <v-btn variant="outlined" color="success" @click="handleDelete">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { IconExclamationCircle, IconTrash } from '@tabler/icons-vue';

const { deleteGroup } = useGroups();

const router = useRouter();
const route = useRoute();
const http = useHttp();

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

watch([dialogOpen], () => {
  error.value = false;
});

const handleDelete = async () => {
  const id = route.params.id as string;
  if (!id) return;

  const deletedGroup = await deleteGroup(id);
  if (deletedGroup) {
    if (deletedGroup.parent) {
      router.replace(`/groups/${deletedGroup.parent.id}`);
    } else {
      router.replace('/groups');
    }

    error.value = false;
    dialogOpen.value = false;
  } else {
    error.value = true;
  }
};
</script>
