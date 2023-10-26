import { Socket, io } from 'socket.io-client';
import { LogMessage } from '../types/log';

export const useLogs = defineStore('logs-store', () => {
  const http = useHttp();
  const socket = ref<Socket>();
  const config = useRuntimeConfig();

  const projectId = ref<string | null>(null);
  const logs = ref<LogMessage[]>([]);

  const connected = ref<boolean>(false);
  const listening = ref<boolean>(false);

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
    if (socket.value && connected.value && projectId.value) {
      socket.value.off(projectId.value);
      socket.value.on(projectId.value, (x: LogMessage) => {
        logs.value.push(x);
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

  return {
    projectId,
    logs,
    connected,
    listening,
    connect,
    disconnect,
    startListening,
    stopListening,
  };
});
