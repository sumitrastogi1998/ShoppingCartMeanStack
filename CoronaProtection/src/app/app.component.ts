import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoronaProtectionApp';
  isShown: boolean = false
  constructor(public auth: AuthService){
    localStorage.removeItem('listofitems')
  }
}
