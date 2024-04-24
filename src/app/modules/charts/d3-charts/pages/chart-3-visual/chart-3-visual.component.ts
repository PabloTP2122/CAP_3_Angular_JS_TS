import { Component, ElementRef, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
//npm i --save-dev @types/d3

@Component({
  selector: 'app-chart-3-visual',
  template: `<svg></svg>`, // Aquí solo se coloca el template a usar
  styleUrl: './chart-3-visual.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class Chart3VisualComponent implements OnInit {

  host: any;
  svg: any;

  // dimension object
  dimensions?: DOMRect;

  @Input() data: any;
  @Input() labels: any;

  //Scale https://d3js.org/d3-scale
  scale_x = d3.scaleLinear();
  scale_y = d3.scaleLinear();

  rectWidth = 20;
  padding = 3;

  constructor(
    element: ElementRef
  ) {
    //Selecciona los elementos root, document.documentElement.
    this.host = d3.select(element.nativeElement);
    console.log('this: ', this);
  }

  ngOnInit(): void {
    //this.svg = d3.select("svg");
    this.svg = this.host.select("svg");
    console.log('This.svg: ', this.svg)
    console.log('SVG_chart_3: ', this.svg);
    this.dimensions = this.svg.node().getBoundingClientRect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.svg) return
    this.setParameters();

    this.draw();
  }

  setParameters() {
    const max_monto = 1.3 * Math.max(...this.data?.map((tipo: { monto: any; }) => tipo.monto)); //1.3=130%
    this.scale_y.domain([0, max_monto]).range([this.dimensions!.height, 0])
  }

  draw() {
    // {tipo: string, monto: 1213}
    const data = this.data?.map((tipo: { monto: number; }) => tipo.monto) || [];
    console.log('Data', data);

    this.svg?.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any, i: any) => i * (this.rectWidth * this.padding))
      .attr('width', this.rectWidth)
      .attr('height', (d: any) => this.dimensions!.height - this.scale_y(d))
      .attr('y', (d: any) => this.scale_y(d));
  }

}
