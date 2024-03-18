import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewCategoryComponent } from './view-category.component';
import { MovieService } from '../../core/services/movie/movie.service';
import { of } from 'rxjs';
import {
    mockMoviesNowPlaing,
    mockMoviesPopular,
    mockMoviesTopRated,
} from './view-category.mock';
import { Router } from '@angular/router';

describe('ViewCategoryComponent', () => {
    let component: ViewCategoryComponent;
    let fixture: ComponentFixture<ViewCategoryComponent>;
    let mockMovieService: jasmine.SpyObj<MovieService>;
    let router: Router;

    beforeEach(async () => {
        mockMovieService = jasmine.createSpyObj('MovieService', [
            'getNowPlayingMovies',
            'getPopularMovies',
            'getTopRatedMovies',
            'getMovie',
            'searchMovies',
        ]);

        await TestBed.configureTestingModule({
            imports: [
                ViewCategoryComponent,
                RouterTestingModule.withRoutes([
                    { path: '', component: ViewCategoryComponent },
                    { path: 'nowPlaying', component: ViewCategoryComponent },
                    { path: 'popular', component: ViewCategoryComponent },
                    { path: 'topRated', component: ViewCategoryComponent },
                ]),
            ],
        }).compileComponents();
        TestBed.overrideComponent(ViewCategoryComponent, {
            set: {
                providers: [
                    { provide: MovieService, useValue: mockMovieService },
                ],
            },
        });

        mockMovieService.getNowPlayingMovies.and.returnValues(
            of(mockMoviesNowPlaing)
        );
        mockMovieService.getPopularMovies.and.returnValues(
            of(mockMoviesPopular)
        );
        mockMovieService.getTopRatedMovies.and.returnValues(
            of(mockMoviesTopRated)
        );

        router = TestBed.inject(Router);
        // router.navigate(['/nowPlaying']);
        // router.initialNavigation();

        fixture = TestBed.createComponent(ViewCategoryComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load data without errors', () => {
        expect(component.loading).toBeTruthy();
        expect(component.error).toBeFalsy();
        expect(component.movies.length).toBe(0);

        fixture.detectChanges();

        expect(component.loading).toBeFalsy();
        expect(component.error).toBeFalsy();
    });

    it('should load data of now playing movies', async () => {
        await fixture.ngZone!.run(() => router.navigate(['/nowPlaying']));
        fixture.detectChanges();

        expect(mockMovieService.getNowPlayingMovies).toHaveBeenCalledWith(1);
        expect(mockMovieService.getPopularMovies).not.toHaveBeenCalled();
        expect(mockMovieService.getTopRatedMovies).not.toHaveBeenCalled();
        expect(component.movies.length).toBe(
            mockMoviesNowPlaing.results.length
        );
        expect(component.page).toBe(mockMoviesNowPlaing.page);
        expect(component.pages).toBe(mockMoviesNowPlaing.total_pages);
    });

    it('should load the data of popular movies', async () => {
        await fixture.ngZone!.run(() => router.navigate(['/popular']));
        fixture.detectChanges();

        expect(component.currentUrl).toBe('/popular');
        expect(mockMovieService.getPopularMovies).toHaveBeenCalledWith(1);
        expect(mockMovieService.getNowPlayingMovies).not.toHaveBeenCalled();
        expect(mockMovieService.getTopRatedMovies).not.toHaveBeenCalled();
        expect(component.movies.length).toBe(mockMoviesPopular.results.length);
        expect(component.page).toBe(mockMoviesPopular.page);
        expect(component.pages).toBe(mockMoviesPopular.total_pages);
    });

    it('should load the data of top rated movies', async () => {
        await fixture.ngZone!.run(() => router.navigate(['/topRated']));
        fixture.detectChanges();

        expect(component.currentUrl).toBe('/topRated');
        expect(mockMovieService.getTopRatedMovies).toHaveBeenCalledWith(1);
        expect(mockMovieService.getNowPlayingMovies).not.toHaveBeenCalled();
        expect(mockMovieService.getPopularMovies).not.toHaveBeenCalled();
        expect(component.movies.length).toBe(mockMoviesTopRated.results.length);
        expect(component.page).toBe(mockMoviesTopRated.page);
        expect(component.pages).toBe(mockMoviesTopRated.total_pages);
    });

    it('should load component with page param', async () => {
        const pageParam = 10;

        await fixture.ngZone!.run(() =>
            router.navigate(['/topRated'], { queryParams: { page: pageParam } })
        );
        fixture.detectChanges();

        expect(mockMovieService.getTopRatedMovies).toHaveBeenCalledWith(
            pageParam
        );
        expect(component.page).toBe(pageParam);
    });
});
