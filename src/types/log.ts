export type LogMessage = {
  id: string;
  timestamp: string;
  ns: number;
  level: string;
  scope: string;
  message: string;
};

export type LogMessageWithMeta = LogMessage & {
  meta: object;
};
