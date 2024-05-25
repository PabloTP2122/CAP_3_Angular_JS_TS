import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChange, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { ITooltipConfig, ITooltipData } from '@models/charts.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart-4-visual',
  template: `<svg class="chart4">
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
    .chart4 { font-size: {{tooltipConfig.labels.fontSize}}px; }

    .chart4 text.title { font-weight: bold;}
    .chart4 .svg-tooltip__value--value {
      font-size: {{tooltipConfig.labels.fontSize}}px;
      font-weight: bold;
    }
    .chart4 .svg-tooltip__background {
      fill: {{tooltipConfig.background.color}};
      fill-opacity: {{tooltipConfig.background.opacity}};
      stroke: {{tooltipConfig.background.stroke}};
      stroke-width: {{tooltipConfig.background.strokeWidth}}px;
      rx: {{tooltipConfig.background.rx}}px;
      ry: {{tooltipConfig.background.ry}}px;
    }
    <!-- .chart4 rect { fill: unset; } -->
  </style>
</svg>`,
  //styleUrl: './chart-4-visual.component.scss'
  styles: [``]
})
export class Chart4VisualComponent implements OnInit, OnChanges {

  // Elementos principales
  host: any;
  svg: any;

  // ------ Contenedores -----
  dataContainer: any;
  xAxisContainer: any;
  yAxisContainer: any;
  legendContainer: any;
  tooltipContainer: any;
  circlesContainer: any;

  // Contenedores etiquetas

  xLabel: any;
  title: any;
  yLabel: any;

  // ----- Datos de entrada -----
  @Input() data: any;
  @Input() colorPallete: any;
  //@Input() reportesAtendidosSimasT: any;

  // Opciones definidas por usuario TODO: mejorar nombre
  xValue: string = '';
  yValue: string = '';
  //colors: string = '';

  // Dimensiones
  dimensions?: DOMRect;
  innerWidth: number = 0;
  innerHeight: number = 0;

  margins = {
    left: 40,
    right: 20,
    top: 10,
    bottom: 40
  };

  // Escalas
  xScale: any;
  yScale: any;
  colors: any;

  // Ejes
  xAxis: any;
  yAxis: any;

  // tipos de reportes, contrataciones, obras
  // Para este ejemplo es el tipo de reportes
  // TODO: obtener desde los tipos en la api (categoría, tipo, etc)
  tipos = ['Aguas residuales', 'Agua potable', 'Conexiones'];

  //line generator
  line: any;

  // Getters
  //TODO: adaptar a caso de uso actual (pensar en reutilización de código para obras y reportes)
  get lineData() {
    const anio = "2021";
    if (!this.data) { return [] }
    /* return dataReportesXAnio.map((reporte: any) => {
      return {
        x: reporte.mes,
        y: reporte.dato
      }
    }); */
    return this.tipos.map((tipo: any) => {
      const dataReportesXAnio = this.data.filter((reporte: any) => reporte.anio === anio && reporte.categoria === tipo);
      return {
        name: tipo,
        data: dataReportesXAnio.map((reporte: any) =>
        ({
          x: reporte.mes,
          y: reporte.dato
        })
        )
      }
    });
  }

  // Config
  private _tooltipConfig: ITooltipConfig = {
    background: {
      xPadding: 10,
      yPadding: 10,
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
      height: 15,
      textSeparator: 5
    },
    symbol: {
      width: 0,
      height: 0,
    },
    offset: {
      x: 5,
      y: 5
    }
  }

  get tooltipConfig() {
    if (!this._tooltipConfig) {
      this._tooltipConfig = this._tooltipConfig;
    }

    return this._tooltipConfig;
  }

  constructor(element: ElementRef) {
    //Selecciona los elementos root, document.documentElement.
    this.host = d3.select(element.nativeElement);

    // Objeto select de D3
    console.log('this: ', this);
  }

  ngOnInit(): void {
    // Selecciona el svg padre de la gráfica de este componente
    this.svg = this.host.select('svg');
    this.setDimensions();
    this.setElements();

    this.updateChart();
  }

  /*
  Métodos que solo se ejecutan una vez en el ciclo de vida de la gráfica.
  Lo anterior cambiará cuando se requiera redimensionar la gráfica.
  Por ejemplo, para el cambio de tamaño por cambio de pantalla, se deberán actualizar las
  dimensiones y el posicionamiento.
  */

  // Define dimensiones
  private setDimensions() {
    // Se extraen las dimensiones del SVG que contendrá a la gráfica.
    this.dimensions = this.svg.node().getBoundingClientRect();
    //console.log('Dimensiones svg: ', this.dimensions)

    // Se define innerWidth e innerHeight (Ver imagen de gráfica)
    this.innerWidth = this.dimensions!.width - this.margins.left - this.margins.right;
    this.innerHeight = this.dimensions!.height - this.margins.top - this.margins.right;

    // viewBox (Para redimensionar y que la gráfica se muestre completa) -> viewBox(min-x min-y width height)
    //this.svg.attr('viewBox', [0, 0, this.dimensions!.width, this.dimensions!.height]);
    this.svg.attr('viewBox', [0, 0, this.dimensions!.width, this.dimensions!.height]);

  }

  // Define todos los elementos contenedores de la gráfica
  setElements() {
    // Eventos del tooltip
    this.svg
      .on('mousemove', this.moveTooltip)
      .on('mouseleave', this.hideTooltip);

    // Define el contenedor para el tooltip
    this.tooltipContainer = this.svg.select('g.tooltipContainer').raise();

    // Contenedores para los ejes (Ver imagen)
    this.xAxisContainer = this.svg
      .append('g')
      .attr('class', 'xAxisContainer')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top + this.innerHeight})`);

    this.yAxisContainer = this.svg
      .append('g')
      .attr('class', 'yAxisContainer')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    // Contenedores de los labels para cada eje
    this.xLabel = this.svg
      .append('g')
      .attr('class', 'xLabelContainer')
      .attr('transform', `translate(${this.margins.left + 0.5 * this.innerWidth}, ${this.dimensions!.height - 5})`)
      .append('text')
      .attr('class', 'label')
      .style('text-anchor', 'middle');

    this.title = this.svg
      .append('g')
      .attr('class', 'titleContainer')
      .attr('transform', `translate(${this.margins.left + 0.5 * this.innerWidth}, ${this.margins.top * 0.5})`)
      .append('text')
      .attr('class', 'title')
      .style('text-anchor', 'middle');

    this.yLabel = this.svg
      .append('g')
      .attr('class', 'yLabelContainer')
      .attr('transform', `translate(15, ${this.margins.top + 0.5 * this.innerHeight})`)
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle');

    // Contenedor para la data
    this.dataContainer = this.svg
      .append('g')
      .attr('class', 'dataContainer')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`);

    // Contenedor para las leyendas de la parte superior
    this.legendContainer = this.svg
      .append('g')
      .attr('class', 'legendContainer')
      .attr('transform', `translate(${this.margins.left}, ${this.dimensions!.height - 0.5 * this.margins.bottom + 10})`);

    // Add dots (agregan los puntos de los datos de los jsons)
    /* this.circlesContainer = this.svg.append('g')
      .attr('class', 'circlesContainer'); */

  }


  ngOnChanges(changes: SimpleChanges): void {
    // Si no se tiene el SVG renderizado, no hacer nada
    if (!this.svg) { return; }
    this.updateChart();
    //console.log('Reportes_atendidos_simas', this.data);
  }

  /*
  Métodos que se sejecutan cada vez que hay un cambio
  en el ciclo de vida de la gráfica.
  Por ejemplo, cuando cambien los datos.
   */

  setParams() {
    const data = this.lineData;
    //TODO: Colocar dropdown para cambiar el año
    const dataReportes = !this.data ? [] : this.data;
    const anio = "2021"
    const dataReportesAnio = dataReportes.filter((reporte: any) => reporte.anio === anio);
    // TODO: si son más de 4 meses,
    //colocarlos de dos en dos para que se muestren correctamente o pensar en otra solición (letra pequeña)
    const xDataMonths = dataReportesAnio.map((reporte: any) => reporte.mes);
    const yDataSolvedReports = dataReportesAnio.map((reporte: any) => reporte.dato);
    const colorsData = dataReportesAnio.map((reporte: any) => reporte.categoria);
    console.log(`Reportes: ${anio}`, dataReportesAnio, '\n',
      `mes: ${xDataMonths}`, '\n',
      `reportes: ${yDataSolvedReports}`, '\n',
      `categoría: ${colorsData}`);

    // definir los dominios (Con los datos se define el dominio)
    const xDomain: any = !xDataMonths ? [0, Date.now] : xDataMonths;
    console.log('xDomain:', xDomain);
    const maxVlues: any = data.map((series) => d3.max(series.data, (d: any) => d.y));
    console.log('maxVlues', maxVlues);
    const yDomain: any = !this.data ? [0, 100] : [0, d3.max(maxVlues)];
    console.log('yDomain', yDomain)
    const colorsDomain = this.tipos;

    console.log('this.innerWidth', this.innerWidth);

    // definir los rangos
    const xRange = [0, this.innerWidth];
    const yRange = [this.innerHeight, 0];
    //const colorRange = d3.schemeCategory10;
    const colorRange = this.colorPallete;

    // Definir las escalas
    //this.xScale = d3.scaleTime(); // Si fueran fechas completas
    this.xScale = d3.scaleBand().domain(xDomain).range(xRange);
    this.yScale = d3.scaleLinear().domain(yDomain).range(yRange);
    this.colors = d3.scaleOrdinal().domain(colorsDomain).range(colorRange);

    // line generator
    this.line = d3.line()
      .x((d: any) => this.xScale(d.x) + this.xScale.bandwidth() / 2)
      .y((d: any) => this.yScale(d.y));
  }
  setLabels() {

  }
  setLegend() {

  }
  setAxis() {
    this.xAxis = d3.axisBottom(this.xScale)
      .tickSizeOuter(0);

    this.xAxisContainer
      .transition()
      .duration(500)
      .call(this.xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");

    this.yAxis = d3.axisLeft(this.yScale);

    this.yAxisContainer
      .transition()
      .duration(500)
      .call(this.yAxis);
  }

  tooltip = (event: MouseEvent, d: { x: string, y: number, name: string }): void => {

    this.showTooltip();
    console.log(event, d, this)
    const value = d.y;

    // convierte el elemento al formato de datos del tooltip
    const tooltipData: ITooltipData = {
      title: d.name,
      color: '',
      key: 'Reportes: ',
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
      .attr('width', tooltipDimensions.width + 0.5 * this._tooltipConfig.background.xPadding)
      .attr('height', tooltipDimensions.height + 0.5 * this._tooltipConfig.background.yPadding)
      .attr('x', -this._tooltipConfig.background.xPadding)
      .attr('y', -this._tooltipConfig.background.yPadding);

    // Set position
    this.moveTooltip(event);

    this.setTooltipStyles();

  }
  private moveTooltip = (event: MouseEvent) => {
    // Calcular la posición para evitar desbordamiento
    // Pointer se usa para transformar al sistema de coordenadas del componente. https://d3js.org/d3-selection/events
    /* Note from documentation: while you can use event.pageX and event.pageY directly,
    it is often convenient to transform the event position to the local
    coordinate system of the element that received the event using d3.pointer.
     */
    // Destructuración de array [x, y].
    const [x, y] = d3.pointer(event, this.svg.node());
    const tooltipWidth = this.tooltipContainer.node().getBBox().width;
    const tooltipHeight = this.tooltipContainer.node().getBBox().height;
    const offsetX = (x + tooltipWidth + this._tooltipConfig.offset.x > this.innerWidth) ? -tooltipWidth - this._tooltipConfig.offset.x : this._tooltipConfig.offset.x;
    const offsetY = (y + tooltipHeight + this._tooltipConfig.offset.y > this.innerHeight) ? -tooltipHeight - this._tooltipConfig.offset.y : this._tooltipConfig.offset.y;
    this.tooltipContainer
      .attr('transform', `translate(${x + offsetX}, ${y + offsetY})`)
      .style('opacity', 1);
  }

  private showTooltip = () => {
    this.tooltipContainer.style('visibility', null);
  }

  //
  private hideTooltip = () => {
    this.tooltipContainer.style('visibility', 'hidden');
  }

  draw() {
    // Vinculando data con los paths
    const lines = this.dataContainer.selectAll('path.data')
      .data(this.lineData);

    // enter and merge
    lines.enter().append('path')
      .attr('class', 'data')
      .style('fill', 'none')
      .style('stroke-width', '3px')
      .merge(lines)
      .attr('d', (d: any) => this.line(d.data))
      .style('stroke', (d: any) => this.colors(d.name))
      ;

    //exit
    lines.exit().remove();

    // Vinculando data con los puntos
    const dots = this.dataContainer.selectAll('circle.data')
      .data(this.lineData.flatMap((d: any) => d.data.map((point: any) => ({ ...point, name: d.name }))));

    // Enter and merge para los puntos
    dots.enter().append('circle')
      .attr('class', 'data')
      .attr('r', 5)
      .merge(dots)
      .attr('cx', (d: any) => this.xScale(d.x) + this.xScale.bandwidth() / 2)
      .attr('cy', (d: any) => this.yScale(d.y))
      .style('fill', (d: any) => this.colors(d.name))
      .style('opacity', 0.7)
      .on('mouseenter', (event: any, data: any) => {
        this.tooltip(event, data);
      });

    // Mueve el tooltip al frente tooltip
    this.tooltipContainer.raise();
    dots.exit().remove();
  }

  setTooltipStyles() {
    // Estilizar el eje x
    this.tooltipContainer.selectAll('text').style('fill', 'black');
  }

  //
  updateChart() {
    this.setParams();
    this.setAxis();
    this.setLabels();
    this.setLegend();
    this.draw();
  }













}
