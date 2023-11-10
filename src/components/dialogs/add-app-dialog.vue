<template>
  <v-tooltip text="Create App" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="state.open = true">
        <IconCubePlus />
      </v-btn>

      <v-dialog v-model="state.open" persistent :max-width="500">
        <v-card :loading="state.loading">
          <v-card-title>Create App</v-card-title>
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
                  hint="The name of the app"
                  persistent-hint
                  required
                  :maxlength="255"
                />
              </v-col>

              <v-col :cols="12">
                <v-select
                  :items="RETENTION_ITEMS"
                  item-title="title"
                  item-value="value"
                  v-model="retentionType"
                  variant="outlined"
                  density="compact"
                  label="Log Retention"
                  hint="Time to keep the logs."
                  persistent-hint
                  required
                />
              </v-col>

              <v-col :cols="12" v-if="retentionType == 'custom'">
                <v-text-field
                  type="number"
                  v-model="data.retentionSeconds"
                  variant="outlined"
                  density="compact"
                  label="Retention Seconds"
                  hint="Number of seconds to keep the logs."
                  persistent-hint
                />
              </v-col>

              <v-col :cols="12">
                <v-text-field
                  v-model="data.repoUrl"
                  variant="outlined"
                  density="compact"
                  label="Repository URL"
                  hint="The URL to the repository"
                  persistent-hint
                  :maxlength="2000"
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
import { IconCubePlus } from '@tabler/icons-vue';
import { reactive, ref, watch } from 'vue';
import { CreateAppDto } from '@/types/app';
import {
  RetentionType,
  RETENTION_ITEMS,
  getRetentionSeconds,
} from '@/types/log-retention';
import { useRouter } from 'vue-router';
import { useAppsStore } from '@/store/apps';

const props = defineProps<{ groupId: string }>();

const router = useRouter();
const appsStore = useAppsStore();

const state = reactive<{
  open: boolean;
  loading: boolean;
  error: string | null;
}>({ open: false, loading: false, error: null });

const retentionType = ref<RetentionType>('1-year');
const data = reactive<CreateAppDto>({
  name: '',
  retentionSeconds: 60 * 60 * 24 * 365,
  repoUrl: '',
  group: props.groupId,
});

watch([props], () => {
  data.group = props.groupId;
});

watch([retentionType], () => {
  data.retentionSeconds =
    getRetentionSeconds(retentionType.value) ?? data.retentionSeconds;
});

const handleClose = () => {
  state.open = false;
  state.loading = false;
  state.error = null;
  data.name = '';
  data.repoUrl = '';
  data.group = props.groupId;
};

const handleSave = async () => {
  state.loading = true;
  try {
    const createdApp = await appsStore.createApp({ ...data });
    router.push({ name: 'app', params: { id: createdApp.id } });

    handleClose();

    state.error = null;
  } catch (err: any) {
    state.error = err.message;
  } finally {
    state.loading = false;
  }
};
</script>
