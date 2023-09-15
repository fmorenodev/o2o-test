import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public get(url: string, options?: any) {
        return this.http.get<BeerData[]>(environment.apiUrl + url, options);
    }

}
