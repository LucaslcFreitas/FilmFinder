import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieService } from '../../core/services/movie/movie.service';
import {
    mockMoviesNowPlaying,
    mockMoviesPopular,
    mockMoviesTopRated,
} from './home.mock';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockMovieService: jasmine.SpyObj<MovieService>;

    beforeEach(async () => {
        mockMovieService = jasmine.createSpyObj('MovieService', [
            'getNowPlayingMovies',
            'getPopularMovies',
            'getTopRatedMovies',
            'getMovie',
            'searchMovies',
        ]);

        await TestBed.configureTestingModule({
            imports: [HomeComponent, RouterTestingModule],
        }).compileComponents();
        TestBed.overrideComponent(HomeComponent, {
            set: {
                providers: [
                    { provide: MovieService, useValue: mockMovieService },
                ],
            },
        });

        mockMovieService.getNowPlayingMovies.and.returnValues(
            of(mockMoviesNowPlaying)
        );
        mockMovieService.getPopularMovies.and.returnValues(
            of(mockMoviesPopular)
        );
        mockMovieService.getTopRatedMovies.and.returnValues(
            of(mockMoviesTopRated)
        );

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        const header = fixture.nativeElement.querySelector(
            'header'
        ) as HTMLElement;

        expect(header).toBeTruthy();
        expect(header.querySelector('h1')?.textContent).toBe('FilmFinder');
        expect(header.querySelector('p')?.textContent?.trim()).toBe(
            'Veja as principais novidades e descubra o filme perfeito para o fim de semana!'
        );

        const container = fixture.nativeElement.querySelector(
            '[data-testid="container"]'
        ) as HTMLElement;

        expect(container.childElementCount).toBe(3);
    });
});
