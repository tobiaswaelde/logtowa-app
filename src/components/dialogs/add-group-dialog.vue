<template>
  <v-tooltip text="Create Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconFolderPlus />
      </v-btn>

      <v-dialog v-model="state.open" persistent :max-width="500">
        <v-card :loading="state.loading">
          <v-card-title>Create Group</v-card-title>
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
                <v-text-field
                  v-model="data.name"
                  variant="outlined"
                  density="compact"
                  label="Name"
                  hint="The name of the group"
                  persistent-hint
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
            <v-btn
              color="success"
              variant="outlined"
              @click="handleSave"
              :disabled="state.loading"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { IconExclamationCircle, IconFolderPlus } from '@tabler/icons-vue';
import { reactive, watch } from 'vue';
import { CreateGroupDto } from '../../types/group';
import { useGroupsStore } from '../../store/groups';
import { useRouter } from 'vue-router';

const props = defineProps<{ groupId?: string }>();

const router = useRouter();
const groupsStore = useGroupsStore();

const state = reactive<{
  open: boolean;
  loading: boolean;
  error: string | null;
}>({ open: false, loading: false, error: null });

const data = reactive<CreateGroupDto>({ name: '', parent: props.groupId });

watch([props], () => {
  data.parent = props.groupId;
});

const handleClose = () => {
  state.open = false;
  state.loading = false;
  state.error = null;
  data.name = '';
  data.parent = props.groupId;
};

const handleSave = async () => {
  state.loading = true;
  try {
    const createdGroup = await groupsStore.createGroup({ ...data });
    router.push({ name: 'group', params: { id: createdGroup.id } });

    handleClose();

    state.error = null;
  } catch (err: any) {
    state.error = err.message;
  } finally {
    state.loading = false;
  }
};
</script>
