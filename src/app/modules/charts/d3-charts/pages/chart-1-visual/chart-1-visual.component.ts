import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-1-visual',
  templateUrl: './chart-1-visual.component.html',
  styleUrl: './chart-1-visual.component.scss'
})
export class Chart1VisualComponent implements OnInit {

  data = [125, 100, 50, 75, 200, 159, 350];
  rectWidth = 80;

  max: number = 250;

  labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  // dimension object
  dimensions?: DOMRect;

  // Paddings
  outerPadding = 20;
  padding = 0;

  bandWidth = 0;
  bandWidthCoef = 0.8; //80%

  // Margins
  left = 10; right = 20; bottom = 30; top = 15;

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
    //const dimensions = svg.getBoundingClientRect();
    this.dimensions = svg.getBoundingClientRect();

    //console.log('Dimensiones del SVG: ', this.dimensions)

    // Para construir margins

    this.innerWidth = this.dimensions!.width - this.left - this.right;

    this.innderHeight = this.dimensions!.height - this.top - this.bottom;
    // Se extrae el with usando los datos para variarlo.
    // ! -> Le indica a JS que los datos estarán disponibles después de renderizar
    // ? -> Le indica a JS que los datos son opcionales recibirlos

    // Width of every rectangle  = (total width dimension - 2 * outer padding) / length of data
    this.rectWidth = (this.innerWidth - 2 * this.outerPadding) / this.data.length;

    //console.log('svg: ', svg);
    // ... -> spread operator para extender o expandir el contenido de un array u objeto
    this.max = 1.3 * Math.max(...this.data); //1.3=130%

    // Para construir paddings internos entre barras
    // Width of every bar = 80% * width of rectangle
    this.bandWidth = this.bandWidthCoef * this.rectWidth;
    // Inner paddigns = (20%) * width de rectangle
    this.padding = (1 - this.bandWidthCoef) * this.rectWidth;



  }
}
