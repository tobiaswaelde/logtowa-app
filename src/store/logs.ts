import { Socket, io } from 'socket.io-client';
import { LogMessage, LogMessageWithMeta } from '../types/log';
import { SortItem } from '../types/vuetify';
import { Paginated } from '../types/pagination';
import qs from 'qs';
import { defineStore } from 'pinia';
import { ref, reactive, computed, watch } from 'vue';
import { useHttp } from '../composables/http';
import { useLogsFilter } from './logs-filter';

export const useLogs = defineStore('logs-store', () => {
  const http = useHttp();
  const socket = ref<Socket>();

  const appId = ref<string | null>(null);
  const { filter } = useLogsFilter();

  //#region socket
  const connected = ref<boolean>(false);
  const listening = ref<boolean>(false);

  const connect = async () => {
    return new Promise((resolve, reject) => {
      console.log('try to connect', appId.value);
      if (!appId.value || connected.value) resolve(false);

      socket.value = io(import.meta.env.VITE_API_BASE_URL, {
        autoConnect: true,
        transports: ['websocket'],
        auth: {
          token: import.meta.env.VITE_SOCKET_TOKEN,
          appkey: appId.value,
        },
      })
        .on('error', (err) => {
          console.log('connection error', err);
          reject(err);
        })
        .on('connect', () => {
          connected.value = true;
          console.log('socket connected');

          if (listening.value) {
            startListening();
          }
          resolve(true);
        })
        .on('disconnect', () => {
          connected.value = false;
          console.log('socket disconnected');
        });
      socket.value.connect();
    });
  };
  const disconnect = () => {
    if (socket.value) {
      if (socket.value.connected) {
        socket.value.disconnect();
      }
      listening.value = false;
    }
  };
  const reconnect = () => {
    disconnect();
    connect();
    startListening();
  };

  const startListening = () => {
    console.log('start listening');
    if (socket.value && connected.value && appId.value) {
      console.log('subscribe');
      socket.value.off(appId.value);
      socket.value.on(appId.value, (newLog: LogMessage) => {
        addLog(newLog);
        logsCount.value++;
      });
      listening.value = true;
    }
  };
  const stopListening = () => {
    if (socket.value && appId.value) {
      console.log('unsubscribe');
      socket.value.off(appId.value);
    }
    socket.value?.offAny();

    console.log('stop listening');
    listening.value = false;
  };

  const addLog = (log: LogMessage) => {
    if (!filter.levels.includes(log.level)) return;
    if (filter.scope !== '' && log.scope !== filter.scope) return;
    if (
      filter.message !== '' &&
      !log.message
        .toLocaleLowerCase()
        .includes(filter.message.toLocaleLowerCase())
    )
      return;

    logs.value.unshift(log);
  };

  //#endregion

  //#region selection
  const selectedLog = ref<LogMessageWithMeta | null>(null);

  const selectLog = async (id: string) => {
    try {
      const res = await http.get<LogMessageWithMeta>(`/api/logs/${id}`);
      selectedLog.value = res.data;
    } catch (err) {
      return null;
    }
  };
  //#endregion

  //#region data
  const logs = ref<LogMessage[]>([]);
  const logsCount = ref<number>(0);
  const loading = ref<boolean>(false);

  const pagination = reactive({
    page: 1,
    itemsPerPage: 20,
  });
  const sortOptions = ref<SortItem[]>([{ key: 'timestamp', order: 'desc' }]);
  const sort = computed(() =>
    sortOptions.value
      .filter((x) => x.order !== undefined)
      .map((x) => ({
        field: x.key,
        direction: x.order === 'asc' ? 'ASC' : 'DESC',
      })),
  );

  const getLogCount = async () => {
    try {
      const q = qs.stringify({
        page: pagination.page,
        perPage: pagination.itemsPerPage,
        filter: {
          scope: filter.scope ? { eq: filter.scope } : undefined,
          level: { in: filter.levels },
        },
      });
      const res = await http.get<number>(
        `/api/apps/${appId.value}/logs/count?${q}`,
      );
      logsCount.value = res.data;
    } catch (err) {
      console.log(err);
      logsCount.value = 0;
    }
  };

  const loadData = async () => {
    try {
      loading.value = true;

      const q = qs.stringify({
        page: pagination.page,
        perPage: pagination.itemsPerPage,
        filter: {
          scope: filter.scope ? { eq: filter.scope } : undefined,
          level: { in: filter.levels },
        },
        sort: sort.value,
      });
      const res = await http.get<Paginated<LogMessage>>(
        `/api/apps/${appId.value}/logs?${q}`,
      );

      logs.value = res.data.items;
      logsCount.value = res.data.meta.itemCount;
    } catch (err) {
      //
    } finally {
      loading.value = false;
    }
  };
  //#endregion

  watch([appId.value], () => {
    if (appId.value) {
      reconnect();
      getLogCount();
    }
  });
  watch([pagination], () => {
    if (pagination.page > 1 && listening.value) {
      stopListening();
    }
  });
  watch([appId, pagination, filter, sortOptions], () => {
    if (appId.value) {
      loadData();
    }
  });

  return {
    appId,
    // socket
    connected,
    listening,
    connect,
    disconnect,
    startListening,
    stopListening,
    // selection
    selectLog,
    selectedLog,
    // data
    logs: computed(() => [...logs.value]),
    logsCount,
    pagination,
    sortOptions,
    loading,
    filter,
    getLogCount,
    loadData,
  };
});
