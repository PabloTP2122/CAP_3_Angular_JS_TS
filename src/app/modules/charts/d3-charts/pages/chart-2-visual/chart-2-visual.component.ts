import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart-2-visual',
  templateUrl: './chart-2-visual.component.html',
  styleUrl: './chart-2-visual.component.scss'
})
export class Chart2VisualComponent implements OnInit, OnChanges {

  // Decorador Input
  @Input() data: any;
  @Input() labels: any;

  //data: number[] = [1, 1, 1];
  rectWidth = 80;
  max: number = 250;

  // dimension object
  dimensions?: DOMRect;

  // Paddings
  outerPadding = 20;
  padding = 0;
  bandWidth = 0;
  bandWidthCoef = 0.8; //80%

  // Margins
  left = 10; right = 20; bottom = 37; top = 15;
  innerWidth: number = 0;
  innderHeight: number = 0;



  constructor(
    private element: ElementRef,
  ) {
  }

  ngOnInit(): void {
    // Se extrae del DOM el primer elemento con la etiqueta SVG.
    const svg = this.element.nativeElement.getElementsByTagName('svg')[0];

    // Se extraen las dimensiones del elemento SVG
    this.dimensions = svg.getBoundingClientRect();

    // Para construir margins
    this.innerWidth = this.dimensions!.width - this.left - this.right;
    this.innderHeight = this.dimensions!.height - this.top - this.bottom;

    this.setParams();

  }

  setParams() {
    const data = this.data || [];
    // Se extrae el with usando los datos para variarlo.
    this.rectWidth = (this.innerWidth - 2 * this.outerPadding) / data.length;
    this.max = 1.3 * Math.max(...data.map((tipo: { monto: any; }) => tipo.monto)); //1.3=130%
    // Para construir paddings
    this.bandWidth = this.bandWidthCoef * this.rectWidth;
    this.padding = (1 - this.bandWidthCoef) * this.rectWidth;
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.setParams();
  }

}
