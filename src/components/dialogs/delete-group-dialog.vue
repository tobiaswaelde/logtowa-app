<template>
  <v-tooltip text="Delete Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconTrash />
      </v-btn>

      <v-dialog v-model="state.open" :max-width="500">
        <v-card :loading="state.loading">
          <v-card-title>Delete Group</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col :cols="12" v-if="state.error">
                <v-alert
                  type="error"
                  variant="elevated"
                  density="compact"
                  :title="state.error"
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
import { IconExclamationCircle, IconTrash } from '@tabler/icons-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useGroupsStore } from '@/store/groups';

const props = defineProps<{ id: string }>();

const router = useRouter();
const groupsStore = useGroupsStore();

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
    console.log('delete group:', props.id);
    const deletedGroup = await groupsStore.deleteGroup(props.id);
    if (deletedGroup.parent) {
      router.replace({
        name: 'group',
        params: { id: deletedGroup.parent.id },
        force: true,
      });
    } else {
      router.replace({ name: 'groups', force: true });
    }

    handleClose();

    state.error = null;
  } catch (err: any) {
    state.error = err.message;
  } finally {
    state.loading = false;
  }
};
</script>
