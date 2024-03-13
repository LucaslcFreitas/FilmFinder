import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoviesComponent } from './list-movies.component';
import { mockMovies, mockTitle } from './list-movies.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ListMoviesComponent', () => {
    let component: ListMoviesComponent;
    let fixture: ComponentFixture<ListMoviesComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListMoviesComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ListMoviesComponent);
        component = fixture.componentInstance;
        component.movies = mockMovies;
        component.title = mockTitle;
        component.loading = true;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        let content = fixture.nativeElement.querySelector(
            '[data-testid="content"]'
        ) as HTMLElement;
        let loading = fixture.nativeElement.querySelector(
            '[data-testid="loading"]'
        ) as HTMLElement;

        expect(content).toBeFalsy();
        expect(loading).toBeTruthy();

        component.loading = false;
        fixture.detectChanges();

        content = fixture.nativeElement.querySelector(
            '[data-testid="content"]'
        ) as HTMLElement;
        loading = fixture.nativeElement.querySelector(
            '[data-testid="loading"]'
        ) as HTMLElement;

        expect(content).toBeTruthy();
        expect(loading).toBeFalsy();

        const title = content.querySelector('h3');
        expect(title).toBeTruthy();
        expect(title?.textContent).toBe(mockTitle);

        //InError
        component.inError = true;
        fixture.detectChanges();

        let list = fixture.nativeElement.querySelector(
            '[data-testid="list"]'
        ) as HTMLElement;
        let error = fixture.nativeElement.querySelector(
            '[data-testid="error"]'
        ) as HTMLElement;

        expect(list).toBeFalsy();
        expect(error).toBeTruthy();
        expect(error.querySelector('h3')?.textContent).toBe(
            'Falha ao buscar os dados :('
        );

        //Normal
        component.inError = false;
        fixture.detectChanges();

        list = fixture.nativeElement.querySelector(
            '[data-testid="list"]'
        ) as HTMLElement;
        error = fixture.nativeElement.querySelector(
            '[data-testid="error"]'
        ) as HTMLElement;

        expect(list).toBeTruthy();
        expect(error).toBeFalsy();

        //In demo
        component.isDemo = true;
        fixture.detectChanges();

        const seeMore = fixture.nativeElement.querySelector(
            '[data-testid="see-more"]'
        ) as HTMLElement;

        expect(seeMore).toBeTruthy();

        //No demo
        component.isDemo = false;
        fixture.detectChanges();

        const movies = list.querySelectorAll('[data-testid="movie"]');
        expect(movies).toBeTruthy();
        expect(movies.length).toBe(mockMovies.length);
    });

    it('should direct link see more', () => {
        spyOn(router, 'navigateByUrl');

        const mockSeeMoreLink = '/movies';

        component.loading = false;
        component.isDemo = true;
        component.showMoreLink = mockSeeMoreLink;
        fixture.detectChanges();

        const seeMore = fixture.nativeElement.querySelector(
            '[data-testid="see-more"]'
        ) as HTMLElement;

        seeMore.click();
        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
        expect(seeMore.getAttribute('href')).toBe(mockSeeMoreLink);
    });
});
