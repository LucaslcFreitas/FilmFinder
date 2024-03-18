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
    apiKey: string = environment.apiKey;
    private baseApiUrl = 'https://api.themoviedb.org/3/movie/';
    private baseApiUrlSearch = 'https://api.themoviedb.org/3/search/movie';

    private endpointnowPlaying = 'now_playing';
    private endpointPopular = 'popular';
    private endpointTopRated = 'top_rated';

    private language = 'pt-BR';

    constructor(private http: HttpClient) {}

    getNowPlayingMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointnowPlaying}?api_key=${this.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }

    getPopularMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointPopular}?api_key=${this.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }

    getTopRatedMovies(page: number = 1): Observable<Response<Movie>> {
        const url = `${this.baseApiUrl}${this.endpointTopRated}?api_key=${this.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<Response<Movie>>(url);
    }

    getMovie(id: string): Observable<MovieDetails> {
        const url = `${this.baseApiUrl}${id}?api_key=${this.apiKey}&append_to_response=credits,videos,release_dates&language=${this.language}`;

        return this.http.get<MovieDetails>(url);
    }

    searchMovies(q: string): Observable<Response<Movie>> {
        const url = `${this.baseApiUrlSearch}?api_key=${this.apiKey}&language=${this.language}&query=${q}`;

        return this.http.get<Response<Movie>>(url);
    }
}
