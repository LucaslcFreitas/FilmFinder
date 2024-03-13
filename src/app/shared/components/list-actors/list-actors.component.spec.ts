import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActorsComponent } from './list-actors.component';
import { RouterTestingModule } from '@angular/router/testing';
import { mockActors, mockTitle } from './list-actors.mock';

describe('ListActorsComponent', () => {
    let component: ListActorsComponent;
    let fixture: ComponentFixture<ListActorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListActorsComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ListActorsComponent);
        component = fixture.componentInstance;
        component.actors = mockActors;
        component.title = mockTitle;
        component.loading = true;
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

        const actors = list.querySelectorAll('[data-testid="actor"]');
        expect(actors).toBeTruthy();
        expect(actors.length).toBe(mockActors.length);
    });
});
