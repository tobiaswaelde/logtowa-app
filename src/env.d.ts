/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_LOADING_DELAY?: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TOKEN: string;
  readonly VITE_SOCKET_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
