export type ChartData = {
  labels: string[];
  levels: string[];
  series: {
    level: string;
    data: number[];
  }[];
};
