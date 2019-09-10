import { Component, OnInit, OnDestroy } from '@angular/core';

import { JhiTrackerService } from 'app/core';
import {MsgtrackerComponent} from "app/msgtracker/msgtracker.component";
import {TrackerMsgService} from "app/core/msgtracker/trackermsg.service";

@Component({
  selector: 'jhi-tracker',
  templateUrl: './tracker.component.html'
})
export class JhiTrackerComponent implements OnInit, OnDestroy {
  activities: any[] = [];

  constructor(private trackerService: JhiTrackerService, private msgTrackerService : TrackerMsgService) {}

  showActivity(activity: any) {
    let existingActivity = false;
    for (let index = 0; index < this.activities.length; index++) {
      if (this.activities[index].sessionId === activity.sessionId) {
        existingActivity = true;
        if (activity.page === 'logout') {
          this.activities.splice(index, 1);
        } else {
          this.activities[index] = activity;
        }
      }
    }
    if (!existingActivity && activity.page !== 'logout') {
      this.activities.push(activity);
    }
  }

  ngOnInit() {
    this.trackerService.subscribe();
    this.trackerService.receive().subscribe(activity => {
      this.showActivity(activity);
    });

    this.msgTrackerService.subscribe();
    this.msgTrackerService.receive().subscribe(activity => {
      this.showActivity(activity);
    });
  }

  ngOnDestroy() {
    this.trackerService.unsubscribe();
  }
}
