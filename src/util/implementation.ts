const apiEndpoint = import.meta.env.VITE_API_BASE_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

export const getNodeImplementation = (appKey: string) => {
  return `import { CloudLoggerTransport } from 'cloud-logger-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = '${apiEndpoint}';
const API_TOKEN = '${apiToken}';
const APP_KEY = '${appKey}';

// create the transport
const cloudLoggerTransport = new CloudLoggerTransport({
  host: HOST,
  token: API_TOKEN,
  appKey: APP_KEY,
});

// create the logger
const logger = winston.createLogger({
	transports: [ cloudLoggerTransport ],
});`;
};
export const getPythonImplementation = (appKey: string) => {
  return null;
};
export const getJavaImplementation = (appKey: string) => {
  return null;
};
