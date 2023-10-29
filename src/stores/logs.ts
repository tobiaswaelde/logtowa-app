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
  const moreAvailable = ref<boolean>(true);

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
        projectkey: projectId.value,
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
      socket.value.off(projectId.value);
    }
    socket.value?.offAny();
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
        `/api/projects/${projectId.value}/logs?${q}`,
      );
      console.log(res.data);
      logs.value = res.data.items;
    } catch (err) {
    } finally {
      loading.value = false;
    }
  };

  const loadMoreData = async () => {
    //
    console.log('load more data');
  };

  watch([sortOptions], () => {
    loadData();
  });

  const getLog = async (id: string) => {
    try {
      const res = await http.get<LogMessageWithMeta>(`/api/logs/${id}`);
      console.log(res.data);
      selectedLog.value = res.data;
    } catch (err) {
      return null;
    }
  };

  return {
    projectId,
    logs,
    logsCount,
    connected,
    listening,
    connect,
    disconnect,
    startListening,
    stopListening,
    sortOptions,
    loading,
    moreAvailable,
    loadMoreData,
    getLog,
    selectedLog,
  };
});
