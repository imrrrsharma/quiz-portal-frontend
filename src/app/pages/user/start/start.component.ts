
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class StartComponent implements OnInit {
  qid;
  questions: any[] = [];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;
  // selectedAnswers: string[] = [];
  rightQuestions = [];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) {}

  ngOnInit(): void {
    this.questions.forEach((q) => (q.givenAnswer = null));
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        // this.selectedAnswers = new Array(this.questions.length).fill(" ");
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

   // Prevent back button functionality
  preventBackButton(): void {
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', () => {
      history.pushState(null, null, location.href);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  handleRefresh(event: BeforeUnloadEvent): void {
    if (!this.isSubmit) {
      event.preventDefault();
      event.returnValue = ''; // Necessary for older browsers
    }
  }


  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        // console.log("Selected ans: " + this.selectedAnswers[0]);
        // console.log("Selected ans length: " + this.selectedAnswers.length);
        // this.questions.forEach((q, index) => {
        //   q.givenAnswer = this.selectedAnswers[index] || null; // Set the selected answer or null if none
        // });
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    //calculation
    //call to sever  to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(this.questions);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
        
        console.log('Correct Answers :' + this.correctAnswers);
        console.log('Marks Got ' + this.marksGot);
        console.log('attempted ' + this.attempted);
      },
      (error) => {
        console.log(error);
      }
    );

    // console.log(this.questions);
    //this is to print report
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.rightQuestions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  print() {
    window.print();
    }

    getCorrectAnswer(questionContent: string): string {
      const correctQuestion = this.rightQuestions.find(
        (rq) => rq.content === questionContent
      );
      return correctQuestion ? correctQuestion.answer : '';
    }
}
