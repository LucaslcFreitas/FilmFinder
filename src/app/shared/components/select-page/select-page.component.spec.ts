import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPageComponent } from './select-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SelectPageComponent', () => {
    let component: SelectPageComponent;
    let fixture: ComponentFixture<SelectPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectPageComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SelectPageComponent);
        component = fixture.componentInstance;
        component.currentUrl = '/movies';
        component.page = 10;
        component.totalPages = 1000;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        const currentPage = 10;
        component.page = currentPage;
        fixture.detectChanges();

        const pagesContainer = fixture.nativeElement.querySelector(
            '[data-testid="pages"]'
        ) as HTMLElement;

        expect(pagesContainer).toBeTruthy();

        const pages = pagesContainer.querySelectorAll('a');

        expect(pages.length).toBe(7);

        for (let i = -3; i < pages.length - 3; i++) {
            expect(pages[i + 3].textContent).toBe((currentPage + i).toString());
            expect(pages[i + 3].getAttribute('href')).toBe(
                `/movies?page=${currentPage + i}`
            );
        }
    });
});
