import { COLORS } from '@/config/colors';

export const getColorFromLevel = (level: string) => {
  switch (level) {
    case 'error':
      return COLORS.red;
    case 'success':
      return COLORS.green;
    case 'warn':
      return COLORS.yellow;
    case 'info':
      return COLORS.blue;
    case 'http':
      return COLORS.purple;
    case 'db':
      return COLORS.cyan;
    case 'verbose':
      return COLORS.text;
    case 'debug':
      return COLORS.orange;
    case 'silly':
      return COLORS.gray;

    default:
      return undefined;
  }
};
