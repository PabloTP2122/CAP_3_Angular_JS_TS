import { Component, ElementRef, OnInit, Input, SimpleChanges } from '@angular/core';
import { ITooltipConfig, ITooltipData } from '@models/charts.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart-3-visual',
  template: `
  <svg class="chart1">
    <g class="tooltipContainer">
    <rect class="svg-tooltip__background"></rect>
    <g class="svg-tooltip">
      <text class="svg-tooltip__title"></text>
      <rect class="svg-tooltip__symbol"></rect>
      <text class="svg-tooltip__value"
      [attr.y]="tooltipConfig.labels.height + 12"
      >
        <tspan class="svg-tooltip__value--key"></tspan>
        <tspan class="svg-tooltip__value--value"></tspan>
      </text>
    </g>
    </g>
    <style>
      .chart1 { font-size: {{tooltipConfig.labels.fontSize}}px; }

      .chart1 text.title { font-weight: bold;}
      .chart1 .svg-tooltip__value--value {
        font-size: {{tooltipConfig.labels.fontSize}}px;
        font-weight: bold;
      }
      .chart1 .svg-tooltip__background {
        fill: {{tooltipConfig.background.color}};
        fill-opacity: {{tooltipConfig.background.opacity}};
        stroke: {{tooltipConfig.background.stroke}};
        stroke-width: {{tooltipConfig.background.strokeWidth}}px;
        rx: {{tooltipConfig.background.rx}}px;
        ry: {{tooltipConfig.background.ry}}px;
      }
      <!-- .chart1 rect { fill: unset; } -->
    </style>
  </svg>`, // Aquí solo se coloca el template a usar
  styles: []
})
export class Chart3VisualComponent implements OnInit {

  host: any;
  svg: any;

  dataContainer: any;
  xAxisContainer: any;
  yAxisContainer: any;
  tooltipContainer: any;
  labels: any;

  // dimension object
  dimensions?: DOMRect;

  @Input() data: any;

  rectWidth = 30;
  padding = 0.2;

  //Scale https://d3js.org/d3-scale
  scale_x = d3.scaleBand().paddingInner(this.padding).paddingOuter(this.padding);
  scale_y = d3.scaleLinear();


  innerWidth?: any;
  innerHeight?: any;
  xAxis: any;
  yAxis: any;

  // Margins
  left = 70; right = 10; bottom = 37; top = 15;

  // Config
  private _tooltipConfig: ITooltipConfig = {
    background: {
      xPadding: 15,
      yPadding: 20,
      color: '#fff',
      opacity: 0.9,
      stroke: '#000',
      strokeWidth: 2,
      rx: 3,
      ry: 3
    },
    labels: {
      symbolSize: 0,
      fontSize: 12,
      height: 20,
      textSeparator: 10
    },
    symbol: {
      width: 6,
      height: 6,
    },
    offset: {
      x: 20,
      y: 20
    }
  }

  get tooltipConfig() {
    if (!this._tooltipConfig) {
      this._tooltipConfig = this._tooltipConfig;
    }

    return this._tooltipConfig;
  }

  // ElementRef -> modificar el DOM
  constructor(element: ElementRef) {
    //Selecciona los elementos root, document.documentElement.
    this.host = d3.select(element.nativeElement);

    // Objeto select de D3
    //console.log('this: ', this);
  }

  ngOnInit(): void {
    //this.svg = d3.select("svg");
    this.svg = this.host.select("svg").attr('xmlns', 'http://www.w3.org/2000/svg');
    this.setDimensions();
    this.setElements();
  }

  setDimensions() {
    this.dimensions = this.svg.node().getBoundingClientRect();

    // Para construir margins
    this.innerWidth = this.dimensions!.width - this.left - this.right;
    this.innerHeight = this.dimensions!.height - this.top - this.bottom;
  }

  setElements() {

    // Tooltip
    // svg -> svg no z-index
    this.tooltipContainer = this.svg.select('g.tooltipContainer').raise();
    /* this.tooltipContainer = this.svg.append('g').attr('class', 'tooltipContainer')
      .html(``) */

    this.dataContainer = this.svg.append('g').attr('class', 'dataContainer')
      .attr('transform', `translate(${this.left},${this.top})`);
    //console.log('SVG_chart_3: ', this.svg);

    this.xAxisContainer = this.svg.append('g').attr('class', 'xAxisContainer')
      .attr('transform', `translate(${this.left},${this.top + this.innerHeight})`);

    this.yAxisContainer = this.svg.append('g').attr('class', 'yAxisContainer')
      .attr('transform', `translate(${this.left},${this.top})`);

  }

  tooltip = (event: MouseEvent, d: { tipo: string, monto: number }): void => {
    //console.log(arguments)
    let currencyFormat = (d: number) => d3.format('$,.2f')(d);
    console.log(event, d, this)
    const value = currencyFormat(Math.round(10 * d.monto) / 10);

    // convierte el elemento al formato de datos del tooltip
    const tooltipData: ITooltipData = {
      title: d.tipo,
      color: '',
      key: 'Monto: ',
      value: `${value}`
    }

    //title
    this.tooltipContainer.select('text.svg-tooltip__title')
      .text(tooltipData.title);

    //value
    this.tooltipContainer.select('text.svg-tooltip__value')
      .attr('y', this._tooltipConfig.labels.height);
    this.tooltipContainer.select('tspan.svg-tooltip__value--key')
      .text(tooltipData.key);

    this.tooltipContainer.select('tspan.svg-tooltip__value--value')
      .text(tooltipData.value);

    //background
    const tooltipDimensions: DOMRect = this.tooltipContainer.select('g.svg-tooltip').node().getBoundingClientRect();

    this.tooltipContainer.select('rect.svg-tooltip__background')
      .attr('width', tooltipDimensions.width + 2 * this._tooltipConfig.background.xPadding)
      .attr('height', tooltipDimensions.height + 2 * this._tooltipConfig.background.yPadding)
      .attr('x', -this._tooltipConfig.background.xPadding)
      .attr('y', -this._tooltipConfig.background.yPadding);

    //resize

    //set position
    const position = d3.pointer(event, this.svg.node())
    console.log(position);
    this.tooltipContainer.attr('transform', `translate(${position[0]}, ${position[1]})`)
    this.setTooltipStyles();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.svg) return;
    this.setParameters();
    this.setAxis();
    this.setAxisStyles();
    this.draw();
  }

  setParameters() {

    const montos = this.data?.map((promedios_tipo: { monto: number, tipo: string }) => promedios_tipo.monto) || [];
    const labels = this.data?.map((promedios_tipo: { monto: number, tipo: string }) => promedios_tipo.tipo) || [];
    // dominio ordinal para los tipos de obra
    this.scale_x.domain(labels).range([0, this.innerWidth]);

    // ... -> spread operator para extender o expandir el contenido de un array u objeto
    const max_monto = 1.3 * Math.max(...montos); //1.3=130%
    this.scale_y.domain([0, max_monto]).range([this.innerHeight, 0])
  }

  draw(): void {
    // ! -> Le indica a JS que los datos estarán disponibles después de renderizar
    // ? -> Le indica a JS que los datos son opcionales recibirlos
    //console.log('data_montos_promedio', this.data)
    // [{monto: 1213, tipo: string}, {monto: 1213, tipo: string}, {monto: 1213, tipo: string}]
    const promedios_tipos = this.data?.map((promedios_tipo: { monto: number, tipo: string }) => promedios_tipo) || [];
    console.log('Data_montos_promedio', promedios_tipos);

    this.dataContainer?.selectAll('rect')
      .data(promedios_tipos)
      .join(
        (enter: any) => enter.append('rect')
          // documentación para manejo de eventos https://d3js.org/d3-selection/events
          .on('mousemove', (event: any, data: any) => { this.tooltip(event, data); })

          .attr('x', (promedio: { monto: number, tipo: string }) => this.scale_x(promedio.tipo))
          .attr('width', this.scale_x.bandwidth())
          .attr('height', (promedio: { monto: number, tipo: string }) => this.innerHeight - this.scale_y(promedio.monto))
          .attr('y', (promedio: { monto: number, tipo: string }) => this.scale_y(promedio.monto)),
        (update: any) => update,
        (exit: { remove: () => any; }) => exit.remove()
      );

    // Mueve el tooltip al frente
    this.tooltipContainer.raise();
  }

  setAxis() {
    this.xAxis = d3.axisBottom(this.scale_x);
    this.xAxisContainer.call(this.xAxis);

    this.yAxis = d3.axisLeft(this.scale_y);
    this.yAxisContainer.call(this.yAxis);
  }


  setAxisStyles() {
    // Estilizar el eje x
    this.xAxisContainer.selectAll('line').style('stroke', 'white');
    this.xAxisContainer.selectAll('path').style('stroke', 'white');
    this.xAxisContainer.selectAll('text').style('fill', 'white');

    // Estilizar el eje y
    this.yAxisContainer.selectAll('line').style('stroke', 'white');
    this.yAxisContainer.selectAll('path').style('stroke', 'white');
    this.yAxisContainer.selectAll('text').style('fill', 'white');
  }

  setTooltipStyles() {
    // Estilizar el eje x
    this.tooltipContainer.selectAll('text').style('fill', 'black');
  }




}
