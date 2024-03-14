import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultComponent } from './search-result.component';
import { MovieService } from '../../core/services/movie/movie.service';
import { mockSearchMovie } from './search-result.mock';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;
    let mockMovieService: jasmine.SpyObj<MovieService>;
    let router: Router;
    const mockSearchParam: string = 'vingadores';

    beforeEach(async () => {
        mockMovieService = jasmine.createSpyObj('MovieService', [
            'getNowPlaingMovies',
            'getPopularMovies',
            'getTopRatedMovies',
            'getMovie',
            'searchMovies',
        ]);

        await TestBed.configureTestingModule({
            imports: [SearchResultComponent, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParams: { q: mockSearchParam },
                        },
                    },
                },
            ],
        }).compileComponents();
        TestBed.overrideComponent(SearchResultComponent, {
            set: {
                providers: [
                    { provide: MovieService, useValue: mockMovieService },
                ],
            },
        });

        mockMovieService.searchMovies.and.returnValues(of(mockSearchMovie));

        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();

        spyOn(router, 'navigate');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should capture the search parameter correctly', () => {
        expect(component.query).toBe(mockSearchParam);
    });

    it('should look for the research films', () => {
        expect(mockMovieService.searchMovies).toHaveBeenCalledWith(
            mockSearchParam
        );
        expect(component.movies.length).toBe(mockSearchMovie.results.length);
    });
});
