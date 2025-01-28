import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
  standalone:true,
    imports:[
      MatCard,
      MatFormField,
      MatLabel,
      MatSlideToggle,
      CommonModule
    ]
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router
  ) {}

  qId = 0;
  quiz;
  categories;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    console.log("quiz id", this.qId);
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        alert('Error in loading categories');
      }
    );
  }

  //update form submit
  public updateData() {
    //validatate

    this._quiz.updateQuiz(this.quiz, this.qId).subscribe(
      (data) => {
        Swal.fire('Success !!', 'quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'error in updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
