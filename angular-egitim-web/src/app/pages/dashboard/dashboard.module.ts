import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {DropdownMenusModule, ModalsModule, WidgetsModule} from '../../_metronic/partials';
import { InlineSVGModule } from 'ng-inline-svg-2';
import {TranslateModule} from "@ngx-translate/core";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      }
    ]),
    InlineSVGModule,
    WidgetsModule,
    ModalsModule,
    TranslateModule,
    DropdownMenusModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
