import { Component, OnInit } from '@angular/core';
import { Users } from '../model/users';
import { AuthService } from '../auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:Users = {userName: null, password: null, uniqueToken:null} 
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(loginData){
    this.auth.loginUser(loginData).subscribe((res)=>{
      alert("Login Success")
      if(res['password'] === "your-admin-password" && res['uniqueToken'] === "xxxx-xxxx-xxxx"){
        this.auth.isAdmin = true;
      }
      this.auth.logInFlag = true
      this.router.navigate(['/items'])
      this.auth.mailToAdmin.fromMailId = JSON.parse(JSON.stringify(res)).userName
    },
  (err)=>{
    if(err.error.text === "Invalid token" || err.error.text==="Invalid Password"){
      alert(err.error.text)
    }
    
    else{
      alert("Problem from our end...")
    }
  })
  }
}
