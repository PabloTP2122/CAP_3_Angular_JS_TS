import { Component } from '@angular/core';
import { Input, OnInit, ElementRef, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';
// Para volver las gráficas componentes reutilizables
import { IPieConfig, IPieData } from '@models/pie_donut.interfaces';

@Component({
  selector: 'app-chart-5-visual',
  templateUrl: './chart-5-visual.component.html',
  styleUrls: ['./chart-5-visual.component.scss']
})
export class Chart5VisualComponent implements OnInit, OnChanges {
  host: any;
  svg: any;
  tooltip: any;

  // Contenedores
  dataContainer: any;
  legendContainer: any;

  title: any;

  // Funciones
  pie: any;
  arc: any;
  arcTween: any;

  // Escalas
  colors: any;

  // Estado
  hiddenIds = new Set();

  @Input() data!: IPieData;

  dimensions?: DOMRect;
  innerWidth?: number;
  innerHeight?: number;
  radius: number = 0;
  innerRadius = 0;

  /* {
    innerRadiusCoef: 0.7, // Al trabajar con la gráfica de dona es necesario trabajar con un innerRadiusCoef que se define como el porcentaje del radio
    hiddenOpacity: 0.3, // Opacidad en las leyendas deshabilitadas, como en la gráfica de líneas
    legendItem: { // Define las propiedades de las leyendas
      symbolSize: 10,
      height: 20,
      fontSize: 12,
      textSeparator: 15
    },
    transition: 800, // Velocidad de las transiciones
    arcs: {
      stroke: '#fff',
      strokeWidth: 2,
      radius: 6, // Corresponde ar redondeo en la gráfica de dona
      padAngle: 0 // Separación etre arcos (Lo usa D3.js)
    },
    margins: {
      left: 10,
      top: 40, // Este margen es más grande por el título
      right: 130, // Este margen es más grande por las leyendas que se muestran al lado
      bottom: 10
    }
  }; */

  config: IPieConfig = {
    innerRadiusCoef: 0.7,
    hiddenOpacity: 0.3,
    legendItem: {
      symbolSize: 10,
      height: 20,
      fontSize: 12,
      textSeparator: 15,
    },
    transition: 800,
    arcs: {
      stroke: '#fff',
      strokeWidth: 2,
      radius: 6,
      padAngle: 0,
    },
    margins: {
      left: 10,
      top: 40,
      right: 130,
      bottom: 10
    },
  };

  // Getters
  get margins() {
    return this.config.margins;
  }

  get ids() {
    return this.data.data.map((d) => String(d.id));
  }

  get pieData() {
    return this.pie(this.data.data.filter((elem) => !this.hiddenIds.has(elem.id)));
  }

  constructor(element: ElementRef) {
    this.host = d3.select(element.nativeElement);
  }

  ngOnInit(): void {
    this.svg = this.host
      .select('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg');
    this.tooltip = d3.select('.tooltip');  // Seleccionar el tooltip
    this.setDimensions();
    this.setElements();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.svg) { return; }
    this.updateChart();
  }

  setDimensions() {
    this.dimensions = this.svg.node().getBoundingClientRect();
    this.innerWidth = this.dimensions!.width - this.margins.left - this.margins.right;
    this.innerHeight = this.dimensions!.height - this.margins.top - this.margins.bottom;
    this.radius = 0.5 * Math.min(this.innerWidth, this.innerHeight);
    this.innerRadius = this.config.innerRadiusCoef * this.radius;
    this.svg.attr('viewBox', [0, 0, this.dimensions!.width, this.dimensions!.height]);
  }

  setElements() {
    this.dataContainer = this.svg
      .append('g')
      .attr('class', 'dataContainer')
      .attr('transform', `translate(${this.margins.left + 0.5 * this.innerWidth!}, ${this.margins.top + 0.5 * this.innerHeight!})`);

    this.legendContainer = this.svg
      .append('g')
      .attr('class', 'legendContainer')
      .attr('transform', `translate(${this.innerWidth! - 0.5 * this.margins.right}, ${this.margins.top + 0.5 * this.innerHeight!})`);

    this.title = this.svg
      .append('g')
      .attr('class', 'titleContainer')
      .attr('transform', `translate(${0.5 * this.dimensions!.width}, ${0.5 * this.margins.top})`)
      .append('text')
      .attr('class', 'title')
      .style('text-anchor', 'middle');
  }

  setParams() {
    // https://d3js.org/d3-shape/arc
    // Generador del arco
    this.arc = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius);
    // Generador de pie
    this.pie = d3.pie()
      .value((d: any) => d.value);

    // Escala de colores
    // https://d3js.org/d3-scale-chromatic/categorical
    this.colors = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(this.ids);
  }

  setLabels() {
    this.title.text(this.data.title);
  }

  setLegends() {
    const data = this.data.data;

    this.legendContainer.selectAll('g.legend-item')
      .data(data)
      .join('g')
      .attr('class', 'legend-item')
      .attr('transform', (d: any, i: number) => `translate(0, ${i * this.config.legendItem.height})`)
      .style('opacity', (d: { id: unknown; }) => this.hiddenIds.has(d.id) ? this.config.hiddenOpacity : null)
      .on('mouseenter', (event: any, d: { id: any; }) => this.setHighlights(d.id))
      .on('mouseleave', () => this.resetHighlights())
      .on('click', (event: any, d: { id: any; }) => this.toggleHighlight(d.id));

    this.legendContainer.selectAll('g.legend-item')
      .selectAll('rect')
      .data((d: any) => [d])
      .join('rect')
      .attr('width', this.config.legendItem.symbolSize)
      .attr('height', this.config.legendItem.symbolSize)
      .style('fill', (d: { id: any; }) => this.colors(d.id));

    this.legendContainer.selectAll('g.legend-item')
      .selectAll('text')
      .data((d: any) => [d])
      .join('text')
      .style('font-size', this.config.legendItem.fontSize + 'px')
      .attr('x', this.config.legendItem.textSeparator)
      .attr('y', this.config.legendItem.symbolSize)
      .text((d: { label: any; }) => d.label);
  }

  draw() {
    const chart = this;
    const data = this.pieData;
    const arcs = this.dataContainer.selectAll('path.data').data(data);

    arcs.enter()
      .append('path')
      .attr('class', 'data')
      .merge(arcs)
      .attr('d', this.arc)
      .style('fill', (d: any) => this.colors(d.data.id))
      .on('mouseenter', (event: { pageX: number; pageY: number; }, d: { data: { id: any; label: any; }; endAngle: number; startAngle: number; }) => {
        this.setHighlights(d.data.id);
        const percentage = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        this.tooltip
          .style('opacity', 1)
          .html(`${d.data.label}: ${percentage.toFixed(2)}%`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseleave', () => {
        this.resetHighlights();
        this.tooltip.style('opacity', 0);
      });

    arcs.exit().remove();

    this.dataContainer.selectAll('text')
      .data(data)
      .join('text')
      .attr('transform', (d: any) => `translate(${this.arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text((d: { endAngle: number; startAngle: number; }) => {
        const percentage = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        return `${percentage.toFixed(2)}%`;
      });
  }

  updateChart() {
    this.setParams();
    this.setLabels();
    this.setLegends();
    this.draw();
  }

  setHighlights(id: unknown) {
    if (this.hiddenIds.has(id)) { return; }
    this.dataContainer.selectAll('path.data').style('opacity', (d: { data: { id: any; }; }) => d.data.id === id ? null : this.config.hiddenOpacity);
    this.legendContainer.selectAll('g.legend-item').style('opacity', (d: { id: any; }) => d.id === id ? null : this.config.hiddenOpacity);
  }

  resetHighlights() {
    this.dataContainer.selectAll('path.data').style('opacity', null);
    this.legendContainer.selectAll('g.legend-item').style('opacity', (d: { id: unknown; }) => !this.hiddenIds.has(d.id) ? null : this.config.hiddenOpacity);
  }

  toggleHighlight(id: unknown) {
    this.hiddenIds.has(id) ? this.hiddenIds.delete(id) : this.hiddenIds.add(id);
    this.updateChart();
  }
}
