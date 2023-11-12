import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LogMessageWithMeta } from '@/types/log';
import { useHttp } from '@/composables/http';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.VITE_DEBUG_LOADING_DELAY);

export const useSelectedLogStore = defineStore('selected-log', () => {
  const http = useHttp();

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const log = ref<LogMessageWithMeta | null>(null);

  const getLog = async (id: string) => {
    try {
      loading.value = true;

      const res = await http.get<LogMessageWithMeta>(`/api/logs/${id}`);
      DELAY && (await wait(DELAY));
      log.value = res.data;

      error.value = null;
    } catch (err) {
      error.value = 'Something went wrong.';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    log,
    getLog,
  };
});
