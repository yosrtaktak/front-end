
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
} from '@coreui/angular';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { RapportActiviteComponent } from "../rappActivite/rapport-activite/rapport-activite.component";
import { RouterLinkActive, RouterModule } from '@angular/router';




@NgModule({
    declarations: [DashboardComponent],
    imports: [
      RouterLinkActive,
      RouterModule,
      CarouselCaptionComponent,
      CarouselComponent,
      CarouselControlComponent,
      CarouselIndicatorsComponent,
      CarouselInnerComponent,
      CarouselItemComponent,
        DashboardRoutingModule,
        CardModule,
        NavModule,
        IconModule,
        TabsModule,
        CommonModule,
        GridModule,
        ProgressModule,
        ReactiveFormsModule,
        ButtonModule,
        FormModule,
        ButtonModule,
        ButtonGroupModule,
        ChartjsModule,
        AvatarModule,
        TableModule,
        WidgetsModule,
        RapportActiviteComponent
    ]
})
export class DashboardModule {
}
