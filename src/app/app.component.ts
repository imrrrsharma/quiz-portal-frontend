import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[
    NavbarComponent,
    NgxUiLoaderModule,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'TestYourself';
}
