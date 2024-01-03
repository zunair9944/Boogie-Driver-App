import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class CacheHelperService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // const storage = await this.storage.create();
    // this._storage = storage;
  }

  store(key: any, value: any){
    localStorage.setItem(key, value);
    // this._storage?.set(key, value);
  }

  get(key:any){
    return localStorage.getItem(key);
    // return this._storage?.get(key);
  }

  delete(key:any){
    return localStorage.removeItem(key);
    // return this._storage?.remove(key);
  }

  clear(){
    localStorage.clear()
    // this._storage?.clear();
  }

}
