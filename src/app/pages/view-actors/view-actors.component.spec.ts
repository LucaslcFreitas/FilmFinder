import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorService } from '../../core/services/actor/actor.service';
import { ViewActorsComponent } from './view-actors.component';
import { of } from 'rxjs';
import { mockGetPopularActors } from './view-actors.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewActorsComponent', () => {
    let component: ViewActorsComponent;
    let fixture: ComponentFixture<ViewActorsComponent>;
    let mockActorService: jasmine.SpyObj<ActorService>;

    beforeEach(async () => {
        mockActorService = jasmine.createSpyObj('ActorService', [
            'getPopularActors',
            'getActor',
        ]);

        await TestBed.configureTestingModule({
            imports: [ViewActorsComponent, RouterTestingModule],
        }).compileComponents();
        TestBed.overrideComponent(ViewActorsComponent, {
            set: {
                providers: [
                    { provide: ActorService, useValue: mockActorService },
                ],
            },
        });

        mockActorService.getPopularActors.and.returnValue(
            of(mockGetPopularActors)
        );

        fixture = TestBed.createComponent(ViewActorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch data on init', () => {
        expect(mockActorService.getPopularActors).toHaveBeenCalled();
        expect(component.actors.length).toBe(
            mockGetPopularActors.results.length
        );
    });

    it('should fetch data on loadActors function', () => {
        component.loadActors();

        expect(mockActorService.getPopularActors.calls.count()).toBe(2);
        expect(component.actors.length).toBe(
            mockGetPopularActors.results.length
        );
        expect(component.loading).toBe(false);
        expect(component.error).toBe(false);
    });
});
