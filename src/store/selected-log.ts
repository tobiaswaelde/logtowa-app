import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LogMessage, LogMessageWithMeta } from '@/types/log';
import { useHttp } from '@/composables/http';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.DEBUG_LOADING_DELAY);

export const useSelectedLogStore = defineStore('selected-log', () => {
  const http = useHttp();

  const drawerOpen = ref<boolean>(false);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const selectedLog = ref<LogMessage | LogMessageWithMeta | null>(null);

  const getLog = async (log: LogMessage) => {
    selectedLog.value = log;
    console.log('get log:', log.id);

    try {
      drawerOpen.value = true;
      loading.value = true;

      const res = await http.get<LogMessageWithMeta>(`/api/logs/${log.id}`);
      DELAY && (await wait(DELAY));
      selectedLog.value = res.data;

      error.value = null;
    } catch (err) {
      error.value = 'Something went wrong.';
    } finally {
      loading.value = false;
    }
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
    selectedLog.value = null;
    error.value = null;
  };

  return {
    // drawer
    drawerOpen,
    closeDrawer,
    // data
    loading,
    error,
    selectedLog,
    getLog,
  };
});
