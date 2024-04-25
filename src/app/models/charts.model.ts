export interface ITooltipData {
  title: string;
  color: string;
  key: string;
  value: number | string;
}

export interface ITooltipConfig {
  background: {
    xPadding: number;
    yPadding: number;
    color: string;
  }
  labels: {
    symbolSize: number;
    fontSize: number;
    height: number;
    textSeparator: number;
  }
}
