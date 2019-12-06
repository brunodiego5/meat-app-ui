import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { LogoutService } from 'src/app/security/logout.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(public authService: AuthService,
              private logoutService: LogoutService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.handleLogin();
  }

  logout() {
    this.logoutService.logout();
  }

}
