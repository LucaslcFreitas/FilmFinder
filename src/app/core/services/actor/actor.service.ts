import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../../shared/models/response';
import { Actor } from '../../../shared/models/actor';

@Injectable({
    providedIn: 'root',
})
export class ActorService {
    private baseApiUrl = 'https://api.themoviedb.org/3/person/';

    private language = 'pt-BR';

    constructor(private http: HttpClient) {}

    getPopularActors(page: number = 1): Observable<Response<Actor>> {
        const url = `${this.baseApiUrl}popular?api_key=${environment.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Actor>>(url);
    }
}
