import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { IncludedMethodsComponent } from './components/included-methods/included-methods.component';
import { FiltersApiCallComponent } from './components/filters-api-call/filters-api-call.component';
import { CssGridComponent } from './components/css-grid/css-grid.component';
import { FlexboxComponent } from './components/flexbox/flexbox.component';
import { CssAnimationsComponent } from './components/css-animations/css-animations.component';


@NgModule({
  declarations: [
    IncludedMethodsComponent,
    FiltersApiCallComponent,
    CssGridComponent,
    FlexboxComponent,
    CssAnimationsComponent,
  ],
  imports: [
    CommonModule,
    ExamplesRoutingModule
  ]
})
export class ExamplesModule { }
