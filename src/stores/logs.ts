import { Socket, io } from 'socket.io-client';
import { LogMessage } from '../types/log';

export const useLogs = defineStore('logs-store', () => {
  const http = useHttp();
  const socket = ref<Socket>();
  const config = useRuntimeConfig();

  const projectId = ref<string | null>(null);
  const logs = ref<LogMessage[]>([]);

  const connected = ref<boolean>(false);

  const connect = () => {
    console.log('try to connect', projectId.value);
    if (!projectId.value) return;

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
      })
      .on('disconnect', () => {
        connected.value = false;
        console.log('socket disconnected');
      });
    socket.value.connect();

    socket.value.on(projectId.value, (x) => {
      logs.value.push(x);
    });
  };
  const disconnect = () => {
    if (socket.value) {
      if (socket.value.connected) {
        socket.value.disconnect();
      }
    }
  };
  const reconnect = () => {
    disconnect();
    connect();
  };

  watch([projectId.value], () => {
    reconnect();
  });

  // onMounted(() => {
  //   connect();
  //   console.log('mounted', projectId.value);
  // });
  // onUnmounted(() => {
  //   disconnect();
  // });

  return { projectId, logs, connected, connect, disconnect };
});
