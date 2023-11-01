import { Socket, io } from 'socket.io-client';
import { LogMessage, LogMessageWithMeta } from '../types/log';
import { SortItem } from '../types/vuetify';
import { Paginated } from '../types/pagination';
import qs from 'qs';

export const useLogs = defineStore('logs-store', () => {
  const http = useHttp();
  const socket = ref<Socket>();
  const config = useRuntimeConfig();

  const appId = ref<string | null>(null);
  const filterDrawerOpen = ref<boolean>(false);

  //#region socket
  const connected = ref<boolean>(false);
  const listening = ref<boolean>(false);

  const connect = async () => {
    return new Promise((resolve, reject) => {
      console.log('try to connect', appId.value);
      if (!appId.value || connected.value) resolve(false);

      socket.value = io(config.public.apiUrl, {
        autoConnect: true,
        transports: ['websocket'],
        auth: {
          token: config.public.socketToken,
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
      socket.value.on(appId.value, (x: LogMessage) => {
        logs.value.unshift(x);
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
  const nextPage = ref<number>(-1);

  const filter = reactive<{
    levels: string[];
    scope: string;
    message: string;
  }>({
    levels: ['error', 'warn', 'info'],
    scope: '',
    message: '',
  });

  const pagination = reactive({
    page: 1,
    itemsPerPage: 20,
  });
  const sortOptions = ref<SortItem[]>([{ key: 'timestamp', order: 'desc' }]);

  const getLogCount = async () => {
    try {
      const q = qs.stringify({
        page: pagination.page,
        perPage: pagination.itemsPerPage,
        filter: { scope: filter.scope, level: { in: filter.levels } },
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
          level: { in: filter.levels },
        },
        // sort: sortOptions.value.map((sort) => ({
        //   field: 'timestamp',
        //   direction: 'desc',
        // })),
        // sort: [{ field: 'timestamp', direction: 'DESC' }],
        sort: sortOptions.value
          .filter((x) => x.order !== undefined)
          .map((x) => ({
            field: x.key,
            direction: x.order === 'asc' ? 'ASC' : 'DESC',
          })),
      });
      const res = await http.get<Paginated<LogMessage>>(
        `/api/apps/${appId.value}/logs?${q}`,
      );

      logs.value = res.data.items;
      logsCount.value = res.data.meta.itemCount;
    } catch (err) {
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
    filterDrawerOpen,
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
