import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  goFurtherRouterLinkPath: string;
  goBackRouterLinkPath: string;
  melding: string;

  constructor(private notificationService: NotificationService) {
    this.goFurtherRouterLinkPath = this.notificationService.goFurtherRouterLinkPath;
    this.goBackRouterLinkPath = this.notificationService.goBackRouterLinkPath;
    this.melding = this.notificationService.melding;
  }

  ngOnInit() {
  }

  onGoFurther() {
    window.location.href = this.notificationService.goFurtherRouterLinkPath;
  }
}
