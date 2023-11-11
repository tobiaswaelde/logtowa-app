export type ChartTimespan = 'hour' | 'day' | 'month';

export type PieChartData = {
  labels: string[];
  series: number[];
};

export type BarChartData = {
  labels: string[];
  levels: string[];
  series: {
    level: string;
    data: number[];
  }[];
};
