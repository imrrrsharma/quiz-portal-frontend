import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'; // Import SweetAlert2 for error handling
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatCardModule,
    MatListModule,
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class HomeComponent implements OnInit {
  text: string = "Welcome to Exam Portal, Let's cross-check your knowledge";
  displayText: string = "";
  typingSpeed: number = 100;
  categories: any[] = [];
  totalUsers: number = 1000;
  totalQuizzes: number = 10000;
  // categories = [
  //   { cid: 33, description: "Math Question", title: "Mathematics" },
  //   { cid: 52, description: "History Questions", title: "History" }
  // ];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this.typeWriter();
    // Fetch categories inside ngOnInit
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
        console.log("categories array length: " +this.categories.length);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  typeWriter() {
    let index = 0;
    const type = () => {
      if (index < this.text.length) {
        this.displayText += this.text.charAt(index);
        index++;
        setTimeout(type, this.typingSpeed);
      }
    };
    type();
  }
}

 