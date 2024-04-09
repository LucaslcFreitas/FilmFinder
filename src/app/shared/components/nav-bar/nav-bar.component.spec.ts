import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavBarComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        //Logo
        const logo = fixture.nativeElement.querySelector(
            '[data-testid="logo"]'
        ) as HTMLElement;

        expect(logo).toBeTruthy();
        expect(logo.getAttribute('href')).toBe('/');
        expect(logo.querySelector('h2')?.textContent).toBe('FilmFinder');
        expect(
            logo
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('magnifying-glass');

        //Links
        const list = fixture.nativeElement.querySelector(
            '[data-testid="links"]'
        ) as HTMLElement;

        expect(list).toBeTruthy();
        const links = list.querySelectorAll('li');
        expect(links.length).toBe(2);
        //  Movie Links
        expect(links[0].querySelector('a')?.textContent).toBe('Filmes');
        //      Sublinks
        const sublinks = links[0].querySelector('div')?.querySelectorAll('a');
        expect(sublinks).toBeTruthy();
        expect(sublinks?.length).toBe(3);
        expect(sublinks![0].getAttribute('href')).toBe('/nowPlaying');
        expect(sublinks![0].textContent).toBe('Lançamentos');
        expect(sublinks![1].getAttribute('href')).toBe('/popular');
        expect(sublinks![1].textContent).toBe('Populares');
        expect(sublinks![2].getAttribute('href')).toBe('/topRated');
        expect(sublinks![2].textContent).toBe('Melhores Avaliados');
        //  Actor Link
        expect(links[1].querySelector('a')?.getAttribute('href')).toBe(
            '/actors'
        );
        expect(links[1].querySelector('a')?.textContent).toBe('Atores');

        //Form search
        const formSearch = fixture.nativeElement.querySelector(
            '[data-testid="form-search"]'
        ) as HTMLElement;

        expect(formSearch).toBeTruthy();
        const imputSearch = formSearch.querySelector('input');
        expect(imputSearch?.getAttribute('placeholder')).toBe(
            'Encontrar filmes...'
        );
        const iconSearch = formSearch.querySelector('fa-icon');
        expect(iconSearch).toBeTruthy();
        expect(
            iconSearch?.querySelector('svg')?.getAttribute('data-icon')
        ).toBe('magnifying-glass');

        //Button theme
        const buttonTheme = fixture.nativeElement.querySelector(
            '[data-testid="button-theme"]'
        ) as HTMLElement;

        expect(buttonTheme).toBeTruthy();
        expect(
            buttonTheme
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('moon');

        //Button menu
        const buttonMenu = fixture.nativeElement.querySelector(
            '[data-testid="button-menu"]'
        ) as HTMLElement;

        expect(buttonMenu).toBeTruthy();
        expect(
            buttonMenu
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('bars');
    });

    it('should navigate to the home', () => {
        spyOn(router, 'navigateByUrl');

        const logo = fixture.nativeElement.querySelector(
            '[data-testid="logo"]'
        ) as HTMLElement;

        logo.click();
        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should navigate to the nowPlaing movies', () => {
        spyOn(router, 'navigateByUrl');

        const list = fixture.nativeElement.querySelector(
            '[data-testid="links"]'
        ) as HTMLElement;
        const links = list.querySelectorAll('li');
        const sublinks = links[0].querySelector('div')?.querySelectorAll('a');

        sublinks![0].click();

        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should navigate to the popular movies', () => {
        spyOn(router, 'navigateByUrl');

        const list = fixture.nativeElement.querySelector(
            '[data-testid="links"]'
        ) as HTMLElement;
        const links = list.querySelectorAll('li');
        const sublinks = links[0].querySelector('div')?.querySelectorAll('a');

        sublinks![1].click();

        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should navigate to the topRated movies', () => {
        spyOn(router, 'navigateByUrl');

        const list = fixture.nativeElement.querySelector(
            '[data-testid="links"]'
        ) as HTMLElement;
        const links = list.querySelectorAll('li');
        const sublinks = links[0].querySelector('div')?.querySelectorAll('a');

        sublinks![2].click();

        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should carry out the search correctly', () => {
        spyOn(router, 'navigate');
        const textSearch: string = 'search value';

        const formSearch = fixture.nativeElement.querySelector(
            '[data-testid="form-search"]'
        ) as HTMLElement;
        const inputSearch = formSearch.querySelector('input');
        inputSearch!.value = textSearch;
        inputSearch!.dispatchEvent(new Event('input'));

        formSearch.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(router.navigate).toHaveBeenCalledWith(['/search'], {
            queryParams: { q: textSearch },
        });
    });

    it('should not perform the search without a minimum size', () => {
        spyOn(router, 'navigate');
        const textSearch: string = 'ab';

        const formSearch = fixture.nativeElement.querySelector(
            '[data-testid="form-search"]'
        ) as HTMLElement;
        const inputSearch = formSearch.querySelector('input');
        inputSearch!.value = textSearch;
        inputSearch!.dispatchEvent(new Event('input'));

        formSearch.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should change the theme', () => {
        const buttonTheme = fixture.nativeElement.querySelector(
            '[data-testid="button-theme"]'
        ) as HTMLElement;
        const body = document.body;

        buttonTheme.click();
        fixture.detectChanges();

        expect(component.theme).toBe('light');
        expect(
            buttonTheme
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('sun');
        expect(body.classList.contains('theme-light')).toBe(true);

        buttonTheme.click();
        fixture.detectChanges();

        expect(component.theme).toBe('dark');
        expect(
            buttonTheme
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('moon');
        expect(body.classList.contains('theme-light')).toBe(false);
    });

    it('should open/close the menu', () => {
        const buttonMenu = fixture.nativeElement.querySelector(
            '[data-testid="button-menu"]'
        ) as HTMLElement;

        buttonMenu.click();
        fixture.detectChanges();

        expect(component.isOpenMenu).toBe(true);
        expect(
            buttonMenu
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('xmark');

        buttonMenu.click();
        fixture.detectChanges();

        expect(component.isOpenMenu).toBe(false);
        expect(
            buttonMenu
                .querySelector('fa-icon')
                ?.querySelector('svg')
                ?.getAttribute('data-icon')
        ).toBe('bars');
    });
});
