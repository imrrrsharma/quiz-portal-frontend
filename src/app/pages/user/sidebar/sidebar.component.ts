import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
  ],
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];

  constructor(private _cat: CategoryService, private _snack: MatSnackBar) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );
  }
}
