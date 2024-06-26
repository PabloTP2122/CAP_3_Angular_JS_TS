import { Component } from '@angular/core';
import { Input, OnInit, ElementRef, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';
// Para volver las gráficas componentes reutilizables
import { IPieConfig, IPieData } from '@models/pie_donut.interfaces';

// Para
//import ObjectHelper from '../../../../../helpers/object.helper';

@Component({
  selector: 'app-chart-5-visual',
  templateUrl: './chart-5-visual.component.html',
  styleUrl: './chart-5-visual.component.scss'
})
export class Chart5VisualComponent implements OnInit, OnChanges {
  host: any;
  svg: any;

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

  //dimensiones
  // ! -> Le indica a TS que los datos estarán disponibles en este punto. Es decir, el valor no será nulo ni undefined
  // ? -> Le indica a TS que los datos son opcionales, es decir que pueden ser undefined y debe manejarlo de forma segura
  dimensions?: DOMRect;

  innerWidth?: number;
  innerHeight?: number;
  radius: number = 0;
  innerRadius = 0;

  /*  innerRadiusCoef: 0.7, // Al trabajar con la gráfica de dona es necesario trabajar con un innerRadiusCoef que se define como el porcentaje del radio
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
    } */

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
    console.log(this);
  }

  ngOnInit(): void {
    this.svg = this.host
      .select('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg');
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
    // Generador del arco
    this.arc = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius);
    // Generador de pie
    this.pie = d3.pie()
      .value((d: any) => d.value);

    // color scale
    this.colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(this.ids);
  }

  setLabels() {
    this.title.text(this.data.title);
  }

  draw() {
    const data = this.pieData;
    //1. Enlace de datos
    const arcs = this.dataContainer
      .selectAll('path.data')
      .data(data);


    //2. Uso de los métodos enter de D3
    arcs.enter()
      .append('path')
      .attr('class', 'data')
      .merge(arcs)
      .attr('d', this.arc)
      .style('fill', (d: any) => this.colors(d.data.id));

    //3. Uso de los métodos exit / remove para cumplir con el patrón de actualización
    arcs.exit().remove();




  }


  updateChart() {
    this.setParams();
    this.setLabels();
    this.draw();
  }



}
