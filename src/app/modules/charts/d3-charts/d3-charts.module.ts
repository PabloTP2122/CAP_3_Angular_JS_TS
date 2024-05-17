import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3ChartsRoutingModule } from './d3-charts-routing.module';
import { Chart1Component } from './components/chart-1/chart-1.component';
import { Chart1VisualComponent } from './pages/chart-1-visual/chart-1-visual.component';
import { Chart2LogicComponent } from './components/chart-2-logic/chart-2-logic.component';
import { Chart2VisualComponent } from './pages/chart-2-visual/chart-2-visual.component';
import { ChartsDashboardComponent } from './pages/charts-dashboard/charts-dashboard.component';
import { Chart3VisualComponent } from './pages/chart-3-visual/chart-3-visual.component';
import { Chart4VisualComponent } from './pages/chart-4-visual/chart-4-visual.component';
import { Chart5VisualComponent } from './pages/chart-5-visual/chart-5-visual.component';
import { Chart6VisualComponent } from './pages/chart-6-visual/chart-6-visual.component';


@NgModule({
  declarations: [
    Chart1Component,
    Chart1VisualComponent,
    Chart2LogicComponent,
    Chart2VisualComponent,
    ChartsDashboardComponent,
    Chart3VisualComponent,
    Chart4VisualComponent,
    Chart5VisualComponent,
    Chart6VisualComponent
  ],
  imports: [
    CommonModule,
    D3ChartsRoutingModule
  ]
})
export class D3ChartsModule { }
