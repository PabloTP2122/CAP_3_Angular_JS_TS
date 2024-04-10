import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-1-visual',
  templateUrl: './chart-1-visual.component.html',
  styleUrl: './chart-1-visual.component.scss'
})
export class Chart1VisualComponent implements OnInit {

  data = [125, 100, 50, 75, 200, 159];
  width = 80;


  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    // El error que tenía fue un typo en getElementByTagName en lugar de getElementsByTagName
    const svg = this.element.nativeElement.getElementsByTagName('svg')[0];
    const dimensions = svg.getBoundingClientRect();

    this.width = dimensions.width / this.data.length;

    console.log(svg, svg.getBoundingClientRect());

  }
}
