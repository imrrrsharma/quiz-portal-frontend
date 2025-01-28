import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;

  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    // window.location.reload();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    // this.login.loginStatusSubject.next(false);
  }

  routeToProfile(){
    this.router.navigate(['/user-dashboard/profile'])
  }
}
