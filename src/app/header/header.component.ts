import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  overlayNavMenuValue = 'none';
  username: string;
  private authService: AuthService;
  constructor(
    ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  onOverlay() {
    if (this.overlayNavMenuValue === 'block') {
      this.overlayNavMenuValue = 'none';
      (document.querySelector('#overlay') as HTMLElement).style.display = this.overlayNavMenuValue;
      document.getElementById('mat-icon-menu-id').innerHTML = 'menu';
    } else {
      this.overlayNavMenuValue = 'block';
      (document.querySelector('#overlay') as HTMLElement).style.display = this.overlayNavMenuValue;
      (document.querySelector('body') as HTMLElement).style.overflow = 'hidden';
      document.getElementById('mat-icon-menu-id').innerHTML = 'arrow_back';
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
