import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../shared/models/response';
import { Movie } from '../../../shared/models/movie';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private baseApiUrl = 'https://api.themoviedb.org/3/movie/';

    private endpointnowPlaing = 'now_playing';
    private endpointPopular = 'popular';
    private endpointTopRated = 'top_rated';

    private language = 'pt-BR';

    constructor(private http: HttpClient) {}

    getNowPlaingMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointnowPlaing}?api_key=${environment.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }

    getPopularMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointPopular}?api_key=${environment.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }

    getTopRatedMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointTopRated}?api_key=${environment.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }
}
