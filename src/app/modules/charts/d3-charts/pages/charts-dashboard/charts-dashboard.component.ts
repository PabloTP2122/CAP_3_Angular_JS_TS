import { Component } from '@angular/core';
import { IPieData } from '@models/pie_donut.interfaces';
import { ChartsService } from '@services/charts.service';
import { Observable, map } from 'rxjs';
import { PieHelper } from '../../../../../helpers/pie.helper';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrl: './charts-dashboard.component.scss'
})
export class ChartsDashboardComponent {

  //data = [1, 2, 3, 4, 5]

  year: string = '2021';

  public data$!: Observable<any[]>
  public data2$!: Observable<any[]>
  public datapie$!: Observable<any[]>

  // Para permitir cambiar los datos con dropDown
  invest: any;

  pieData: IPieData = {
    title: '',
    data: []
  }

  colorsPalette: string[] = ["#9c755f", "#17becf", "#f28e2c"];

  constructor(
    private chartsService: ChartsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.chartsService.getMontosPromedio();
    this.data2$ = this.chartsService.getReportesAtendidosSimasTorreon();
    this.datapie$ = this.chartsService.getInvestData();

    this.datapie$.subscribe((data) => {
      this.invest = data;
      this.pieSelectedData('now');
      //this.pieData = this.convertInvestDataToPieData('before');
      //console.log('pieData:', this.pieData);
    })

  }


  changeYearLineChart(event: any) {
    console.log('Valor del dropdown: ', event.target.value);
    this.year = event.target.value;
  }

  /* convertInvestDataToPieData(valueAttr: string) {
    const data = this.invest.map((e: any) =>
    ({
      id: e.name,
      label: e.name,
      value: e[valueAttr]
    }))
    return {
      title: "Inversión en infraestructura",
      data
    }
  } */

  pieSelectedData(event: any) {
    const valueAttr = typeof event === 'string' ? event : event.target.value;
    this.pieData = PieHelper.convert(this.invest, "Inversión en infraestructura", valueAttr, 'name', 'name');
    //console.log('Evento: ', event.target.value);
  }


}
