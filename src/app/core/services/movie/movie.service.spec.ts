import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    environment,
    mockMovie,
    mockMoviesNowPlaing,
    mockMoviesPopular,
    mockMoviesTopRated,
    mockSearch,
} from './movie.mock';

describe('MovieService', () => {
    let service: MovieService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MovieService);
        httpMock = TestBed.inject(HttpTestingController);

        //Mock api key
        service.apiKey = environment.apiKey;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch data from now playing', () => {
        service.getNowPlayingMovies().subscribe((data) => {
            expect(data).toEqual(mockMoviesNowPlaing);
        });

        const req = httpMock.expectOne(
            'https://api.themoviedb.org/3/movie/now_playing?api_key=123456&language=pt-BR&page=1'
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockMoviesNowPlaing);
    });

    it('should fetch data from popular movies', () => {
        service.getPopularMovies().subscribe((data) => {
            expect(data).toEqual(mockMoviesPopular);
        });

        const req = httpMock.expectOne(
            'https://api.themoviedb.org/3/movie/popular?api_key=123456&language=pt-BR&page=1'
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockMoviesPopular);
    });

    it('should fetch data from top rated movies', () => {
        service.getTopRatedMovies().subscribe((data) => {
            expect(data).toEqual(mockMoviesTopRated);
        });

        const req = httpMock.expectOne(
            'https://api.themoviedb.org/3/movie/top_rated?api_key=123456&language=pt-BR&page=1'
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockMoviesTopRated);
    });

    it('should fetch data from specific movie', () => {
        const movieId = '123';

        service.getMovie(movieId).subscribe((data) => {
            expect(data).toEqual(mockMovie);
        });

        const req = httpMock.expectOne(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=123456&append_to_response=credits,videos,release_dates&language=pt-BR`
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockMovie);
    });

    it('should fetch data from search', () => {
        const q = 'vingadores';

        service.searchMovies(q).subscribe((data) => {
            expect(data).toEqual(mockSearch);
        });

        const req = httpMock.expectOne(
            `https://api.themoviedb.org/3/search/movie?api_key=123456&language=pt-BR&query=${q}`
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockSearch);
    });
});
