import { Injectable } from '@angular/core';
import { Users } from './model/users';
import { Router } from '../../node_modules/@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { Suggestions } from './model/suggestions';
import { FileUser } from './model/fileuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfoStore: Users[] = []
  logInFlag = false;
  constructor(private router: Router, private http: HttpClient) { }

  mailToAdmin: Suggestions ={fromMailId: null, suggestion: null}
  isAdmin: boolean = false
  loggedIn() {
    return this.logInFlag
  }

  removeUser() {
    this.logInFlag = false
    this.isAdmin = false
    localStorage.removeItem('listofitems')
    this.router.navigate(['/register'])
  }
  sendMail(mailSend: Suggestions): Observable<Suggestions[]> {
    alert(JSON.stringify(mailSend))
    return this.http.post<Suggestions[]>('http://localhost:3000/api/mailToAdmin', mailSend);
  }

  postUser(user: Users): Observable<any> {
    alert(JSON.stringify(user))
    return this.http.post<Users[]>('http://localhost:3000/api/register-user', user);
  }

  getAllItems() {
    return this.http.get("http://localhost:3000/api/getAllItems")
  }

  postFileUser(formdata: FormData): Observable<any> {
    //alert(JSON.stringify(user))
    return this.http.post<FileUser[]>('http://localhost:3000/api/create-user', formdata);
  }

  loginUser(user: Users): Observable<Users[]> {
    return this.http.post<Users[]>('http://localhost:3000/api/login-user', user);
  }
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}