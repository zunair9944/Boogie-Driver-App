import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutguardService } from '../services/auth/autguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  
  constructor(private Authguardservice: AutguardService, private router: Router) {}  
  async canActivate() { 
    const response = await this.Authguardservice.gettoken();
    let isAuth = response ? true : false;;
    if (!isAuth) {  
        this.router.navigateByUrl("/signin");  
    }  
    return response ? true : false;  
  }
  
}
