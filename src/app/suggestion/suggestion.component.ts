import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  suggestion: string = null
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  sendSuggestionMail(){
    this.auth.mailToAdmin.suggestion=this.suggestion
    this.auth.sendMail(this.auth.mailToAdmin).subscribe((res)=>{
      alert("Thanks for your feedback")
    },
  (err)=>{
    alert("Error in Sending Mail To Company")
  })
  }
}
