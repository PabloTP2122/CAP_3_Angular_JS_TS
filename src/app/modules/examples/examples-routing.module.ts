import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncludedMethodsComponent } from './components/included-methods/included-methods.component';
import { FiltersApiCallComponent } from './components/filters-api-call/filters-api-call.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filters-api',
    pathMatch: 'full'

  },
  {
    /* ruta real -> /examples/methods */
    path: 'methods',
    component: IncludedMethodsComponent
  },
  /* ruta real -> /examples/filters-api */
  {
    path: 'filters-api',
    component: FiltersApiCallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
