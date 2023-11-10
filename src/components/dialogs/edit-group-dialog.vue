<template>
  <v-tooltip text="Edit Group" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconEdit />
      </v-btn>

      <v-dialog v-model="state.open" persistent :max-width="500">
        <v-card :loading="state.loading">
          <v-card-title>Edit Group</v-card-title>
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
import { IconExclamationCircle, IconEdit } from '@tabler/icons-vue';
import { onBeforeMount, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { UpdateGroupDto } from '@/types/group';
import { useGroupsStore } from '@/store/groups';

const props = defineProps<{ id: string }>();

const router = useRouter();
const groupsStore = useGroupsStore();

const state = reactive<{
  open: boolean;
  loading: boolean;
  error: string | null;
}>({ open: false, loading: false, error: null });

const data = reactive<UpdateGroupDto>({ name: '', parent: undefined });

const updateData = async () => {
  const group = await groupsStore.getGroup(props.id);
  if (group) {
    data.name = group.name;
    data.parent = group.parent?.id;
  }
};

watch([props], async () => {
  console.log('UPDATE DATA');
  await updateData();
});

onBeforeMount(async () => {
  await updateData();
});

const handleClose = () => {
  state.open = false;
  state.loading = false;
  state.error = null;
  updateData();
};
const handleSave = async () => {
  state.loading = true;
  try {
    const updatedGroup = await groupsStore.updateGroup(props.id, data);
    router.replace({
      name: 'group',
      params: { id: updatedGroup.id },
      force: true,
    });

    handleClose();

    state.error = null;
  } catch (err: any) {
    state.error = err.message;
  } finally {
    state.loading = false;
  }
};
</script>
