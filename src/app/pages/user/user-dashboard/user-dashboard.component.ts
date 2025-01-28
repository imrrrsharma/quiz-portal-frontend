import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet
  ],
})
export class UserDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
