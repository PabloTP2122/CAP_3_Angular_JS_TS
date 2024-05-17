import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chart-4-visual',
  templateUrl: './chart-4-visual.component.html',
  styleUrl: './chart-4-visual.component.scss'
})
export class Chart4VisualComponent {

  // Elementos principales
  host: any;
  svg: any;

  // Contenedores
  dataContainer: any;
  xAxisContainer: any;
  yAxisContainer: any;

  // Etiquetas (labels)
  xLabel: any;
  yLabel: any;

  // Datos de entrada
  @Input() reportesAtendidosSimasT: any;

  // Opciones definidas por usuario TODO: mejorar nombre
  xValue: string = '';
  yValue: string = '';
  colors: string = '';

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

  // Ejes
  xAxis: any;
  yAxis: any;












}
