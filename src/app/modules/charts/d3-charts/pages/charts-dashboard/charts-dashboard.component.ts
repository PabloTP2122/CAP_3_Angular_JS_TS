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

  invest: any;

  dataPie: any;


  pieData: IPieData = {
    title: '',
    data: []
  };


  colorsPalette: string[] = ["#9c755f", "#17becf", "#f28e2c"];

  constructor(
    private chartsService: ChartsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.chartsService.getMontosPromedio();
    this.data2$ = this.chartsService.getReportesAtendidosSimasTorreon();
    this.datapie$ = this.chartsService.getInvestData();

    console.log('this.datapie$: ', this.datapie$);

    this.datapie$.subscribe((data) => {
      this.invest = data;
      console.log('data: ', data);
      this.dataPie = this.convertInvestDataToPieData('now');
      this.pieData = this.dataPie;

      console.log('this.dataPie: ', this.dataPie);
    });

  }


  changeYearLineChart(event: any) {
    console.log('Valor del dropdown: ', event.target.value);
    this.year = event.target.value;
  }

  //
  convertInvestDataToPieData(dropDawnVlue: string) {
    /*

   {
    title: ''
    data: {
      id: 0,
      label: '',
      value: 0
    }
   }
    */
    /*
    d = {
     "name": "Carreteras",
     "now": 45.20,
     "before": 35.00
     },
    */
    const data = this.invest.map((d: any) => ({
      id: d.name,
      label: d.name,
      value: d[dropDawnVlue]
    }));


    return {
      title: '',
      data: data
    }

  }

  pieSelectedData(event: any) {
    const dropDawnVlue = event.target.value;
    const pieValues = this.convertInvestDataToPieData(dropDawnVlue);
    this.pieData = pieValues;
    console.log('pieValues: ', pieValues);
  }


}
