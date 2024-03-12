import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieCardComponent } from './movie-card.component';
import { mockMovie } from './movie-card.mock';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';
import { faHeart as faHeartChecked } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartUnchecked } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

describe('MovieCardComponent', () => {
    let component: MovieCardComponent;
    let fixture: ComponentFixture<MovieCardComponent>;
    let mockFavoriteService: jasmine.SpyObj<FavoriteService>;
    let router: Router;

    beforeEach(async () => {
        mockFavoriteService = jasmine.createSpyObj('FavoriteService', [
            'favoriteMovie',
            'unfavoriteMovie',
            'isFavorite',
        ]);

        await TestBed.configureTestingModule({
            imports: [MovieCardComponent, RouterTestingModule],
        }).compileComponents();
        TestBed.overrideComponent(MovieCardComponent, {
            set: {
                providers: [
                    { provide: FavoriteService, useValue: mockFavoriteService },
                ],
            },
        });

        fixture = TestBed.createComponent(MovieCardComponent);
        component = fixture.componentInstance;
        component.movie = mockMovie;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        const favoriteIcon = fixture.nativeElement.querySelector(
            '[data-testid="favorite"]'
        ) as HTMLElement;
        expect(favoriteIcon).toBeTruthy();

        const poster = fixture.nativeElement.querySelector(
            '[data-testid="poster"]'
        ) as HTMLElement;
        expect(poster).toBeTruthy();
        expect(poster.getAttribute('src')).toEqual(
            `https://image.tmdb.org/t/p/w200${mockMovie.poster_path}`
        );

        const average = fixture.nativeElement.querySelector(
            '[data-testid="average"]'
        ) as HTMLElement;
        expect(average).toBeTruthy();
        expect(average.textContent).toContain('87%');

        const title = fixture.nativeElement.querySelector(
            '[data-testid="title"]'
        ) as HTMLElement;
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual(mockMovie.title);

        const subtitle = fixture.nativeElement.querySelector(
            '[data-testid="subtitle"]'
        ) as HTMLElement;
        expect(subtitle).toBeTruthy();
        expect(subtitle.textContent).toContain('23/09/1994');
    });

    it('should favorite/unfavorite movie', () => {
        const favoriteIcon = fixture.nativeElement.querySelector(
            '[data-testid="favorite"]'
        ) as HTMLElement;

        //Favorite
        favoriteIcon.click();

        fixture.detectChanges();

        expect(mockFavoriteService.favoriteMovie).toHaveBeenCalled();
        expect(component.isFavorite).toBeTruthy();
        expect(component.iconHeart).toEqual(faHeartChecked);

        //Unfavorite
        favoriteIcon.click();

        fixture.detectChanges();

        expect(mockFavoriteService.favoriteMovie).toHaveBeenCalled();
        expect(component.isFavorite).toBeFalsy();
        expect(component.iconHeart).toEqual(faHeartUnchecked);

        //Mach calls
        expect(mockFavoriteService.favoriteMovie.calls.count()).toEqual(1);
        expect(mockFavoriteService.unfavoriteMovie.calls.count()).toEqual(1);
    });

    it('should navigate to the movie by router navigate', () => {
        spyOn(router, 'navigate');

        const cover = fixture.nativeElement.querySelector(
            '[data-testid="cover"]'
        ) as HTMLElement;

        cover.click();

        expect(router.navigate).toHaveBeenCalledWith([`movie/${mockMovie.id}`]);
    });

    it('should navigate to the movie by link', () => {
        spyOn(router, 'navigateByUrl');

        const title = fixture.nativeElement.querySelector(
            '[data-testid="title"]'
        ) as HTMLElement;

        title.click();
        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should call the handleFavorite function', () => {
        spyOn(router, 'navigate');

        component.handleOpenMovie();
        expect(router.navigate).toHaveBeenCalledWith([`movie/${mockMovie.id}`]);
    });

    it('should call the handleOpenMovie function', () => {
        const eventMock = new Event('click');
        component.handleFavorite(eventMock);

        expect(mockFavoriteService.favoriteMovie).toHaveBeenCalled();
    });
});
