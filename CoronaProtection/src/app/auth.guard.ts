import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private auth:AuthService){}
  canActivate(): boolean{
    if(this.auth.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/register'])
      return false;
    }
  }
  
}
