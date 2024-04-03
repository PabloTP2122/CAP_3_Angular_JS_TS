import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-1-visual',
  templateUrl: './chart-1-visual.component.html',
  styleUrl: './chart-1-visual.component.scss'
})
export class Chart1VisualComponent implements OnInit {

  data = [125, 100, 50, 75, 200];
  width = 30;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
