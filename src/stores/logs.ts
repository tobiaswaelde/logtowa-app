import { Socket, io } from 'socket.io-client';
import { LogMessage, LogMessageWithMeta } from '../types/log';
import { SortItem } from '../types/vuetify';
import { Paginated } from '../types/pagination';
import qs from 'qs';

export const useLogs = defineStore('logs-store', () => {
  const http = useHttp();
  const socket = ref<Socket>();
  const config = useRuntimeConfig();

  const projectId = ref<string | null>(null);
  const logs = ref<LogMessage[]>([]);
  const logsCount = ref<number>(0);
  const sortOptions = ref<SortItem[]>([{ key: 'timestamp', order: 'desc' }]);
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

  const connected = ref<boolean>(false);
  const listening = ref<boolean>(false);

  const selectedLog = ref<LogMessageWithMeta | null>(null);

  const connect = () => {
    console.log('try to connect', projectId.value);
    if (!projectId.value || connected.value) return;

    socket.value = io(config.public.apiUrl, {
      autoConnect: true,
      transports: ['websocket'],
      auth: {
        token: config.public.socketToken,
        appkey: projectId.value,
      },
    })
      .on('error', (err) => {
        console.log('connection error', err);
      })
      .on('connect', () => {
        connected.value = true;
        console.log('socket connected');

        if (listening.value) {
          startListening();
        }
      })
      .on('disconnect', () => {
        connected.value = false;
        console.log('socket disconnected');
      });
    socket.value.connect();
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
    if (socket.value && connected.value && projectId.value) {
      console.log('subscribe');
      socket.value.off(projectId.value);
      socket.value.on(projectId.value, (x: LogMessage) => {
        logs.value.unshift(x);
      });
      listening.value = true;
    }
  };
  const stopListening = () => {
    if (socket.value && projectId.value) {
      console.log('unsubscribe');
      socket.value.off(projectId.value);
    }
    socket.value?.offAny();

    console.log('stop listening');
    listening.value = false;
  };

  watch([projectId.value], () => {
    reconnect();
  });

  const loadData = async () => {
    if (!projectId.value) return;
    try {
      loading.value = true;
      const q = qs.stringify({
        sort: [{ field: 'timestamp', direction: 'DESC' }],
      });
      const res = await http.get<Paginated<LogMessage>>(
        `/api/apps/${projectId.value}/logs?${q}`,
      );

      if (res.data.meta.hasNextPage) {
        nextPage.value = res.data.meta.page + 1;
      } else {
        nextPage.value = -1;
      }

      logs.value = res.data.items;
    } catch (err) {
    } finally {
      loading.value = false;
    }
  };

  const loadMoreData = async () => {
    //
    console.log('load more data');
    try {
      loading.value = true;
      const q = qs.stringify({
        sort: [{ field: 'timestamp', direction: 'DESC' }],
        page: nextPage.value,
      });
      const res = await http.get<Paginated<LogMessage>>(
        `/api/apps/${projectId.value}/logs?${q}`,
      );

      if (res.data.meta.hasNextPage) {
        nextPage.value = res.data.meta.page + 1;
      } else {
        nextPage.value = -1;
      }

      logs.value.push(...res.data.items);
      console.log(logs.value.length);
    } catch (err) {
      //
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  watch([sortOptions], () => {
    loadData();
  });

  const getLog = async (id: string) => {
    try {
      const res = await http.get<LogMessageWithMeta>(`/api/logs/${id}`);
      selectedLog.value = res.data;
    } catch (err) {
      return null;
    }
  };

  watch([filter], () => {
    console.log('FILTER:', filter);
  });

  const displayLogs = computed(() => {
    return logs.value.filter(
      (x) =>
        filter.levels.includes(x.level) &&
        (filter.scope !== ''
          ? x.scope.toLocaleLowerCase() === filter.scope.toLocaleLowerCase()
          : true) &&
        (filter.message !== ''
          ? x.message
              .toLocaleLowerCase()
              .includes(filter.message.toLocaleLowerCase())
          : true),
    );
  });

  return {
    projectId,
    logs: displayLogs,
    logsCount,
    connected,
    listening,
    connect,
    disconnect,
    startListening,
    stopListening,
    sortOptions,
    loading,
    loadMoreData,
    getLog,
    selectedLog,
    filter,
  };
});
