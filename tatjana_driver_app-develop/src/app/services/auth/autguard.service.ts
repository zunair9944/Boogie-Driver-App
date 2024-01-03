import { Injectable } from '@angular/core';
import { CacheHelperService } from '../cache/cache-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AutguardService {

  constructor(private cache: CacheHelperService) { }

  async gettoken(){  
    return this.cache.get('token');//!!localStorage.getItem("token");  
  }  
}
