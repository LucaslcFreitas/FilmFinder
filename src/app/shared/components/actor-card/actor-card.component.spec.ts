import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActorCardComponent } from './actor-card.component';
import { Router } from '@angular/router';
import { mockActor, mockActorCast } from './actor-card.mock';

describe('ActorCardComponent', () => {
    let component: ActorCardComponent;
    let fixture: ComponentFixture<ActorCardComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ActorCardComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ActorCardComponent);
        component = fixture.componentInstance;
        component.actor = mockActorCast;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', () => {
        const containerLink = fixture.nativeElement.querySelector(
            '[data-testid="container-link"]'
        ) as HTMLElement;
        expect(containerLink).toBeTruthy();
        expect(containerLink.getAttribute('href')).toEqual(
            `/actor/${mockActorCast.id}`
        );

        const profile = fixture.nativeElement.querySelector(
            '[data-testid="profile"]'
        ) as HTMLElement;
        expect(profile).toBeTruthy();
        expect(profile.getAttribute('src')).toEqual(
            `https://image.tmdb.org/t/p/w200${mockActorCast.profile_path}`
        );

        const name = fixture.nativeElement.querySelector(
            '[data-testid="name"]'
        ) as HTMLElement;
        expect(name).toBeTruthy();
        expect(name.textContent).toEqual(mockActorCast.name);

        const subtitle = fixture.nativeElement.querySelector(
            '[data-testid="subtitle"]'
        ) as HTMLElement;
        expect(subtitle).toBeTruthy();
        expect(subtitle.textContent).toEqual(mockActorCast.character);
    });

    it('should navigate to the actor', () => {
        spyOn(router, 'navigateByUrl');

        const containerLink = fixture.nativeElement.querySelector(
            '[data-testid="container-link"]'
        ) as HTMLElement;

        containerLink.click();
        fixture.detectChanges();

        expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should return the correctly subtitle', () => {
        const subtitleCast = component.getSubTitle();
        expect(subtitleCast).toEqual(mockActorCast.character);

        component.actor = mockActor;

        const subtitleActor = component.getSubTitle();
        expect(subtitleActor).toEqual(mockActorCast.original_name);
    });
});
