import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewMovieComponent } from './view-movie.component';
import { mockGetMovie } from './view-movie.mock';
import { MovieService } from '../../core/services/movie/movie.service';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('ViewMovieComponent', () => {
    let component: ViewMovieComponent;
    let fixture: ComponentFixture<ViewMovieComponent>;
    let mockMovieService: jasmine.SpyObj<MovieService>;
    let mockFavoriteService: jasmine.SpyObj<FavoriteService>;

    beforeEach(async () => {
        mockMovieService = jasmine.createSpyObj('MovieService', [
            'getNowPlayingMovies',
            'getPopularMovies',
            'getTopRatedMovies',
            'getMovie',
            'searchMovies',
        ]);
        mockFavoriteService = jasmine.createSpyObj('FavoriteService', [
            'favoriteMovie',
            'unfavoriteMovie',
            'isFavorite',
        ]);

        await TestBed.configureTestingModule({
            imports: [
                ViewMovieComponent,
                RouterTestingModule.withRoutes([
                    { path: '', component: ViewMovieComponent },
                    { path: 'movie/:id', component: ViewMovieComponent },
                ]),
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({}),
                        },
                    },
                },
            ],
        }).compileComponents();
        TestBed.overrideComponent(ViewMovieComponent, {
            set: {
                providers: [
                    { provide: MovieService, useValue: mockMovieService },
                    { provide: FavoriteService, useValue: mockFavoriteService },
                ],
            },
        });

        mockMovieService.getMovie.and.returnValues(of(mockGetMovie));
        mockFavoriteService.isFavorite.and.returnValue(false);
    });

    it('should create', async () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetMovie.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewMovieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', async () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetMovie.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewMovieComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        expect(component.loading).toBeFalsy();
        expect(component.error).toBeFalsy();

        expect(component.backdropPath).toBeTruthy(mockGetMovie.backdrop_path);

        const container = fixture.nativeElement.querySelector(
            '[data-testid="container"]'
        ) as HTMLElement;

        expect(container).toBeTruthy();

        const poster = fixture.nativeElement.querySelector(
            '[data-testid="poster"]'
        ) as HTMLElement;

        expect(poster.getAttribute('src')).toBe(
            `https://image.tmdb.org/t/p/w500/${mockGetMovie.poster_path}`
        );

        const title = fixture.nativeElement.querySelector(
            '[data-testid="title"]'
        ) as HTMLElement;

        expect(title.textContent?.trim()).toBe(
            `${mockGetMovie.title} (${new Date(mockGetMovie.release_date).getFullYear()})`
        );

        const release = fixture.nativeElement.querySelector(
            '[data-testid="release"]'
        ) as HTMLElement;
        const releaseDate = new Date(mockGetMovie.release_date);
        const releaseDateFormated = `${formatNumberDate(releaseDate.getDate() + 1)}/${formatNumberDate(releaseDate.getMonth() + 1)}/${releaseDate.getFullYear()}`;
        const genres: string[] = mockGetMovie.genres.map((genre) => genre.name);
        expect(release.textContent?.trim()).toBe(
            `${releaseDateFormated} -${genres.reduce((acumulator, current) => {
                return acumulator + current;
            }, '')}`
        );

        const rate = fixture.nativeElement.querySelector(
            '[data-testid="rate"]'
        ) as HTMLElement;

        expect(
            rate
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('heart');

        const vote = fixture.nativeElement.querySelector(
            '[data-testid="vote"]'
        ) as HTMLElement;
        expect(vote.textContent?.trim()).toBe(
            `${Math.floor(mockGetMovie.vote_average * 10)}%`
        );

        const synopsis = fixture.nativeElement.querySelector(
            '[data-testid="synopsis"]'
        ) as HTMLElement;
        expect(synopsis.querySelector('h2')?.textContent).toBe('Sinopse');
        expect(synopsis.querySelector('p')?.textContent).toBe(
            mockGetMovie.overview
        );

        const budget = fixture.nativeElement.querySelector(
            '[data-testid="budget"]'
        ) as HTMLElement;
        expect(budget.querySelector('h3')?.textContent).toBe('Orçamento:');
        expect(budget.querySelector('p')?.textContent).toBe(
            USDollar.format(mockGetMovie.budget)
        );

        const revenue = fixture.nativeElement.querySelector(
            '[data-testid="revenue"]'
        ) as HTMLElement;
        expect(revenue.querySelector('h3')?.textContent).toBe('Receita:');
        expect(revenue.querySelector('p')?.textContent).toBe(
            USDollar.format(mockGetMovie.revenue)
        );

        const originalTitle = fixture.nativeElement.querySelector(
            '[data-testid="originalTitle"]'
        ) as HTMLElement;
        expect(originalTitle.querySelector('h3')?.textContent).toBe(
            'Título Original:'
        );
        expect(originalTitle.querySelector('p')?.textContent).toBe(
            mockGetMovie.original_title
        );

        const originaLanguage = fixture.nativeElement.querySelector(
            '[data-testid="originaLanguage"]'
        ) as HTMLElement;
        expect(originaLanguage.querySelector('h3')?.textContent).toBe(
            'Idioma Original:'
        );
        expect(originaLanguage.querySelector('p')?.textContent).toBe(
            mockGetMovie.original_language
        );

        const producers = fixture.nativeElement.querySelector(
            '[data-testid="producers"]'
        ) as HTMLElement;
        const prods: string[] = mockGetMovie.production_companies.map(
            (productor) => productor.name
        );
        expect(producers.querySelector('h3')?.textContent).toBe(
            'Produtora(s):'
        );
        expect(
            producers.textContent?.trim().replace('Produtora(s): ', '')
        ).toBe(
            `${prods.reduce((acumulator, current, index) => {
                if (index == 0) return current;
                return acumulator + '  ' + current;
            }, '')}`
        );
    });

    it('should load data from service', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetMovie.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewMovieComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        expect(mockMovieService.getMovie).toHaveBeenCalled();
        expect(component.movieDetails).toBe(mockGetMovie);
        expect(component.backdropPath).toBe(mockGetMovie.backdrop_path);
    });

    it('should issue an error due to lack of id', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({}),
                },
            },
        });
        fixture = TestBed.createComponent(ViewMovieComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        expect(component.loading).toBeFalsy();
        expect(component.error).toBeTruthy();

        const container = fixture.nativeElement.querySelector(
            '[data-testid="container"]'
        ) as HTMLElement;
        expect(container).toBeFalsy();
        const error = fixture.nativeElement.querySelector(
            '[data-testid="error"]'
        ) as HTMLElement;
        expect(error).toBeTruthy();
        expect(error.querySelector('h3')?.textContent).toBe(
            'Falha ao buscar os dados :('
        );
    });

    it('should check if the movie is favorite and favorite it', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetMovie.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewMovieComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        expect(mockFavoriteService.isFavorite).toHaveBeenCalled();

        const rate = fixture.nativeElement.querySelector(
            '[data-testid="rate"]'
        ) as HTMLElement;

        const favorite = rate.querySelector('fa-icon') as HTMLElement;

        //Favoite
        favorite.click();
        expect(mockFavoriteService.favoriteMovie).toHaveBeenCalledWith(
            mockGetMovie.id.toString()
        );

        //Unfavorite
        favorite.click();
        expect(mockFavoriteService.unfavoriteMovie).toHaveBeenCalledWith(
            mockGetMovie.id.toString()
        );
    });
});

function formatNumberDate(number: number): string {
    if (number <= 9) return '0' + number.toString();
    else return number.toString();
}

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
