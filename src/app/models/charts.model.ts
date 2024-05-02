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
    color: string,
    opacity: number,
    stroke: string,
    strokeWidth: 2,
    rx: number,
    ry: number
  }
  labels: {
    symbolSize: number;
    fontSize: number;
    height: number;
    textSeparator: number;
  }
  symbol: {
    width: number,
    height: number,
  },
  offset: {
    x: number,
    y: number
  }
}
