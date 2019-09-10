import { Route } from '@angular/router';

import { JhiMetricsMonitoringComponent } from './metrics.component';
import {MsgtrackerComponent} from "app/msgtracker/msgtracker.component";

export const metricsRoute: Route = {
  path: 'jhi-metrics',
  // component: JhiMetricsMonitoringComponent,
  component: MsgtrackerComponent,
  data: {
    pageTitle: 'metrics.title'
  }
};
