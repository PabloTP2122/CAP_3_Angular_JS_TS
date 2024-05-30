import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncludedMethodsComponent } from './components/included-methods/included-methods.component';
import { FiltersApiCallComponent } from './components/filters-api-call/filters-api-call.component';
import { CssGridComponent } from './components/css-grid/css-grid.component';
import { CssAnimationsComponent } from './components/css-animations/css-animations.component';
import { FlexboxComponent } from './components/flexbox/flexbox.component';

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
  },
  {
    path: 'css-grid',
    component: CssGridComponent
  },
  {
    path: 'css-flex',
    component: FlexboxComponent
  },
  {
    path: 'css-animations',
    component: CssAnimationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
