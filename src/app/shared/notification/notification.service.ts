import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  goFurtherRouterLinkPath = 'https://www.youtube.com/watch?v=oHg5SJYRHA0';
  goBackRouterLinkPath = 'dashboard';
  melding = 'Helaas is het niet gelukt. Probeert u het nog een keer.';

  constructor() {}

  onGoFurtherRouterLinkPath(goFurtherRouterLinkPath: string) {
    this.goFurtherRouterLinkPath = goFurtherRouterLinkPath;
  }

  onGoBackRouterLinkPath(goBackRouterLinkPath: string) {
    this.goBackRouterLinkPath = goBackRouterLinkPath;
  }

  makeNotification(melding: string) {
    this.melding = melding;
  }
}
