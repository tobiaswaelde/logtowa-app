import { useHttp } from '@/composables/http';
import { LogMessage } from '@/types/log';
import { SortItem } from '@/types/vuetify';
import { Paginated } from '@/types/pagination';
import { useLogsFilterStore } from './log-filter';
import { defineStore } from 'pinia';
import qs from 'qs';
import { wait } from 'run-in-sequence';
import { Socket, io } from 'socket.io-client';
import { computed, ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { COLORS } from '@/config/colors';

const DELAY = Number(import.meta.env.DEBUG_LOADING_DELAY);
const DEV = Boolean(import.meta.env.DEV);

const sortOptions: SortItem[] = [
  { key: 'timestamp', order: 'desc' },
  { key: 'ns', order: 'desc' },
];
const sort = sortOptions
  .filter((x) => x.order !== undefined)
  .map((x) => ({
    field: x.key,
    direction: x.order === 'asc' ? 'ASC' : 'DESC',
  }));

const logSocket = (message: string, ...args: any[]) => {
  if (!DEV) return;
  console.log(
    '%c[socket] ' + `%c${message} ` + `%c${args.join(' ')}`,
    `color:${COLORS.blue}`,
    'color:unset',
    `color:${COLORS.orange}`,
  );
};

export const useAppLogsStore = defineStore('app-logs', () => {
  const http = useHttp();
  const socket = ref<Socket>();

  const appId = ref<string | null>(null);
  const { filter } = useLogsFilterStore();

  //#region socket
  const connected = ref<boolean>(false);
  const listening = ref<boolean>(false);
  const socketError = ref<boolean>(false);

  const connect = async () => {
    return new Promise((resolve, reject) => {
      logSocket('try to connect', appId.value);
      if (!appId.value || connected.value) resolve(false);

      socket.value = io(import.meta.env.API_BASE_URL, {
        autoConnect: true,
        transports: ['websocket'],
        auth: {
          token: import.meta.env.SOCKET_TOKEN,
          appkey: appId.value,
        },
      })
        .on('error', (err) => {
          logSocket('connection error', err);
          socketError.value = true;
          reject(err);
        })
        .on('connect', () => {
          socketError.value = false;
          connected.value = true;
          logSocket('connected');

          if (listening.value) {
            startListening();
          }
          resolve(true);
        })
        .on('disconnect', () => {
          socketError.value = true;
          stopListening();
          connected.value = false;
          logSocket('disconnected');
        });
      socket.value.connect();
    });
  };
  const disconnect = () => {
    stopListening();

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
    logSocket('start listening');
    if (socket.value && connected.value && appId.value) {
      logSocket('subscribe');
      socket.value.off(appId.value);
      socket.value.on(appId.value, (newLog: LogMessage) => {
        logSocket('message received');
        addLog(newLog);
        logsCount.value++;
      });
      listening.value = true;
    }
  };
  const stopListening = () => {
    if (socket.value && appId.value) {
      logSocket('unsubscribe');
      socket.value.off(appId.value);
    }
    socket.value?.offAny();

    logSocket('stop listening');
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

  //#region data
  const logs = ref<LogMessage[]>([]);
  const logsCount = ref<number>(0);
  const loading = ref<boolean>(false);

  const page = ref<number>(1);
  const itemsPerPage = useStorage<number>('logs-items-per-page', 20);

  const getLogCount = async () => {
    try {
      const q = qs.stringify({
        page: page.value,
        perPage: itemsPerPage.value,
        filter: {
          scope: filter.scope ? { eq: filter.scope } : undefined,
          level: { in: filter.levels },
        },
      });
      const res = await http.get<number>(
        `/api/apps/${appId.value}/logs/count?${q}`,
      );

      DELAY && (await wait(DELAY));

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
        page: page.value,
        perPage: itemsPerPage.value,
        filter: {
          scope: filter.scope ? { eq: filter.scope } : undefined,
          level: { in: filter.levels },
        },
        sort: sort,
      });
      const res = await http.get<Paginated<LogMessage>>(
        `/api/apps/${appId.value}/logs?${q}`,
      );

      DELAY && (await wait(DELAY));

      logs.value = res.data.items;
      logsCount.value = res.data.meta.itemCount;
    } catch (err) {
      //
    } finally {
      loading.value = false;
    }
  };
  //#endregion

  watch([appId], () => {
    if (appId.value) {
      reconnect();
      getLogCount();
    }
  });
  watch([page], () => {
    if (page.value > 1 && listening.value) {
      stopListening();
    }
  });
  watch([appId, page, itemsPerPage, filter, sortOptions], () => {
    if (appId.value) {
      loadData();
    }
  });

  return {
    appId,
    // socket
    connected,
    listening,
    socketError,
    connect,
    disconnect,
    startListening,
    stopListening,
    // data
    page,
    itemsPerPage,
    sortOptions,
    filter,
    loading,
    logs: computed(() => [...logs.value]),
    logsCount,
    getLogCount,
    loadData,
  };
});
