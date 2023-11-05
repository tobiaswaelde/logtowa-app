<template>
  <v-tooltip text="Delete App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="dialogOpen = true">
        <IconTrash />
      </v-btn>
      <v-dialog v-model="dialogOpen" :max-width="500">
        <v-card>
          <v-card-title>Delete App</v-card-title>
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
              <v-col :cols="12"> Dou you really want to delete the app? </v-col>
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
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApps } from '../../store/apps';

const { deleteApp } = useApps();

const router = useRouter();
const route = useRoute();

const dialogOpen = ref<boolean>(false);
const error = ref<boolean>(false);

watch([dialogOpen], () => {
  error.value = false;
});

const handleDelete = async () => {
  const id = route.params.id as string;
  if (!id) return;

  const deletedApp = await deleteApp(id);
  if (deletedApp) {
    if (deletedApp.group) {
      router.replace(`/groups/${deletedApp.group.id}`);
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
