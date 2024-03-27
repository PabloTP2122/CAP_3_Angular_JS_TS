import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { IncludedMethodsComponent } from './components/included-methods/included-methods.component';
import { FiltersApiCallComponent } from './components/filters-api-call/filters-api-call.component';


@NgModule({
  declarations: [
    IncludedMethodsComponent,
    FiltersApiCallComponent,
  ],
  imports: [
    CommonModule,
    ExamplesRoutingModule
  ]
})
export class ExamplesModule { }
