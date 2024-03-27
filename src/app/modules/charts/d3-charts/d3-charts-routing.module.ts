import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsDashboardComponent } from './pages/charts-dashboard/charts-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'charts-dashboard',
    pathMatch: 'full'

  },
  {
    path: 'charts-dashboard',
    component: ChartsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3ChartsRoutingModule { }
