const apiEndpoint = import.meta.env.API_BASE_URL;
const token = import.meta.env.SOCKET_TOKEN;

export const getNodeImplementation = (appKey: string) => {
  return `import { LogTowaTransport } from 'logtowa-winston-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = '${apiEndpoint}';
const TOKEN = '${token}';
const APP_KEY = '${appKey}';

// create the transport
const logtowaTransport = new LogTowaTransport({
  host: HOST,
  token: TOKEN,
  appKey: APP_KEY,
});

// create the logger
const logger = winston.createLogger({
	transports: [ logtowaTransport ],
});`;
};
export const getPythonImplementation = (appKey: string) => {
  return null;
};
export const getJavaImplementation = (appKey: string) => {
  return null;
};
