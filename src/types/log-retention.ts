export type RetentionType =
  | '1-day'
  | '1-week'
  | '1-month'
  | '3-months'
  | '1-year'
  | '10-years'
  | 'custom';

export const RETENTION_ITEMS: { title: string; value: RetentionType }[] = [
  { title: '1 Day', value: '1-day' },
  { title: '1 Week', value: '1-week' },
  { title: '1 Month', value: '1-month' },
  { title: '3 Months', value: '3-months' },
  { title: '1 Year', value: '1-year' },
  { title: '10 Years', value: '10-years' },
  { title: 'Custom', value: 'custom' },
];

const SECONDS_1_DAY = 60 * 60 * 24;

export const getRetentionSeconds = (retentionType: RetentionType) => {
  switch (retentionType) {
    case '1-day':
      return SECONDS_1_DAY;
    case '1-week':
      return SECONDS_1_DAY * 7;
    case '1-month':
      return SECONDS_1_DAY * 30;
    case '3-months':
      return SECONDS_1_DAY * 30 * 3;
    case '1-year':
      return SECONDS_1_DAY * 365;
    case '10-years':
      return SECONDS_1_DAY * 365 * 10;
    case 'custom':
      return null;
  }
};

export const getRetentionTypeFromSeconds = (seconds: number): RetentionType => {
  for (const retentionItem of RETENTION_ITEMS) {
    const retentionSeconds = getRetentionSeconds(retentionItem.value);
    if (retentionSeconds && seconds === retentionSeconds) {
      return retentionItem.value;
    }
  }

  return 'custom';
};
