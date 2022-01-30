import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header/header.service';
import { activityMessages } from './locale/ru/activity-messages.ru';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass'],
})
export class ActivitiesComponent implements OnInit {
  constructor(headerService: HeaderService) {
    headerService.changedHeader(activityMessages.header);
  }

  ngOnInit(): void {}
}
