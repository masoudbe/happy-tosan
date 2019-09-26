import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrackerMsgService} from "app/core/msgtracker/trackermsg.service";

@Component({
  selector: 'jhi-msgtracker',
  templateUrl: './msgtracker.component.html',
  styleUrls: ['./msgtracker.component.scss']
})
export class MsgtrackerComponent implements OnInit, OnDestroy {
  activities: any[] = [];

  constructor(private msgService: TrackerMsgService) {
    this.msgService.connect();
  }

  showActivity(activity: any) {
    let existingActivity = false;
    for (let index = 0; index < this.activities.length; index++) {
      if (this.activities[index].sessionId === activity.sessionId) {
        existingActivity = true;
        this.activities[index] = activity;
      }
    }
    this.activities.push(activity);
  }

  ngOnInit() {
    this.msgService.subscribe();
    this.msgService.receive().subscribe(activity => {
      this.showActivity(activity);
    });
  }

  ngOnDestroy() {
    this.msgService.unsubscribe();
  }

  sendMessage(){
    this.msgService.sendActivity();
  }

  onSearchChange(searchValue: string): void {
    this.sendMessage();
  }
}
