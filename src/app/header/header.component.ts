import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  overlayNavMenuValue: string = 'none';

  constructor() { }

  ngOnInit() {
  }

  onOverlay() {
    if (this.overlayNavMenuValue == 'block') {
      this.overlayNavMenuValue = 'none';
      (document.querySelector('#overlay') as HTMLElement).style.display = this.overlayNavMenuValue;
    } else {
      this.overlayNavMenuValue = 'block';
      (document.querySelector('#overlay') as HTMLElement).style.display = this.overlayNavMenuValue;
      (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
    }
  }
}
