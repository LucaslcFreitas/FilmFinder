import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActorsComponent } from './view-actors.component';

describe('ViewActorsComponent', () => {
    let component: ViewActorsComponent;
    let fixture: ComponentFixture<ViewActorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ViewActorsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewActorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
