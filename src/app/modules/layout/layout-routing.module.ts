import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'examples',
        pathMatch: 'full'
      },
      {
        // ruta /examples
        path: 'examples',
        loadChildren: () => import('../examples/examples.module').then((m) => m.ExamplesModule),
      },
      {
        // ruta /charts
        path: 'charts',
        loadChildren: () => import('../charts/d3-charts/d3-charts.module').then((m) => m.D3ChartsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
