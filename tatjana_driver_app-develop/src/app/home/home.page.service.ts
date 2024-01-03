import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HomePageService {

    constructor(private http: HttpClient){}

    handleHomeAPI(){
        console.log('loging in ...');
        // this.http.get<any>('https://swapi.dev/api/people').subscribe(response => {
        //     console.log(response);
            
        // });

        let url = 'https://eoffofwezmj15jh.m.pipedream.net'


        this.http.post(url,{'zzz':'aaaaaa'}
            ).subscribe(response => {
            console.log(response);
            
        });

    }
}