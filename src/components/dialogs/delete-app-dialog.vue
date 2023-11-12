<template>
  <v-tooltip text="Delete App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconTrash />
      </v-btn>

      <v-dialog v-model="state.open" :max-width="500">
        <v-card :loading="state.loading">
          <v-card-title>Delete App</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col :cols="12" v-if="state.error">
                <ErrorMessage :title="state.error" />
              </v-col>

              <v-col :cols="12">
                Dou you really want to delete the app? This will also delete all
                saved logs of the app.
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="error" @click="handleClose">No</v-btn>
            <v-btn variant="outlined" color="success" @click="handleDelete">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import ErrorMessage from '@/components/common/error-message.vue';
import { IconTrash } from '@tabler/icons-vue';
import { useRouter } from 'vue-router';
import { useAppsStore } from '@/store/apps';
import { reactive } from 'vue';

const props = defineProps<{ id: string }>();

const router = useRouter();
const appsStore = useAppsStore();

const state = reactive<{
  open: boolean;
  loading: boolean;
  error: string | null;
}>({ open: false, loading: false, error: null });

const handleClose = () => {
  state.open = false;
  state.loading = false;
  state.error = null;
};
const handleDelete = async () => {
  state.loading = true;
  try {
    const deletedApp = await appsStore.deleteApp(props.id);
    router.replace({
      name: 'group',
      params: { id: deletedApp.group.id },
      force: true,
    });

    handleClose();

    state.error = null;
  } catch (err: any) {
    state.error = 'Something went wrong.';
  } finally {
    state.loading = false;
  }
};
</script>
