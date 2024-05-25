import { Component } from '@angular/core';
import { ChartsService } from '@services/charts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrl: './charts-dashboard.component.scss'
})
export class ChartsDashboardComponent {

  //data = [1, 2, 3, 4, 5]

  public data$!: Observable<any[]>
  public data2$!: Observable<any[]>

  colorsPalette: string[] = ["#9c755f", "#17becf", "#f28e2c"];

  constructor(
    private chartsService: ChartsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.chartsService.getMontosPromedio();
    this.data2$ = this.chartsService.getReportesAtendidosSimasTorreon();
  }



}
