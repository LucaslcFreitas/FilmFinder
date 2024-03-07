import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../shared/models/response';
import { Movie } from '../../../shared/models/movie';
import { MovieDetails } from '../../../shared/models/movie-details';

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

    getMovie(id: string): Observable<MovieDetails> {
        const url = `${this.baseApiUrl}${id}?api_key=${environment.apiKey}&append_to_response=credits,videos,release_dates&language=${this.language}`;

        return this.http.get<MovieDetails>(url);
    }
}
