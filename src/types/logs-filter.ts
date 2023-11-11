export type LogsFilter = {
  levels: string[];
  scope: string;
  message: string;
};

export const DEFAUL_LOGS_FILTER: LogsFilter = {
  levels: ['error', 'warn', 'info'].toSorted(undefined),
  scope: '',
  message: '',
};
