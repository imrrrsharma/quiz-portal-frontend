import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:true,
  imports:[
    CommonModule,
  ]
})
export class ProfileComponent implements OnInit {
  user = null;
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    console.log("Profile component ts file before")
    this.user = this.login.getUser();
    console.log("Profile component ts file after")
    // this.user = this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
    console.log(this.user);
  }
}
