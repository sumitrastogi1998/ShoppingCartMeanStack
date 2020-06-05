import { Component, OnInit } from '@angular/core';
import { Users } from '../model/users';
import { AuthService } from '../auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData:Users = {userName: null, password: null, uniqueToken: null}
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  registerUser(value){
    this.registerUserData.userName = value.userName
    this.registerUserData.password = value.password
    this.registerUserData.uniqueToken = this.auth.getUniqueId(3)
    this.auth.postUser(this.registerUserData).subscribe((res)=>{
      this.router.navigate(['/login'])
    },
  (error)=>{
    alert(error.error.text)
  })
  }
}
