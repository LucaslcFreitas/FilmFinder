import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewActorComponent } from './view-actor.component';
import { ActorService } from '../../core/services/actor/actor.service';
import { mockGetActor } from './view-actor.mock';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('ViewActorComponent', () => {
    let component: ViewActorComponent;
    let fixture: ComponentFixture<ViewActorComponent>;
    let mockActorService: jasmine.SpyObj<ActorService>;

    beforeEach(async () => {
        mockActorService = jasmine.createSpyObj('ActorService', [
            'getPopularActors',
            'getActor',
        ]);

        await TestBed.configureTestingModule({
            imports: [
                ViewActorComponent,
                RouterTestingModule.withRoutes([
                    { path: '', component: ViewActorComponent },
                    { path: 'actor/:id', component: ViewActorComponent },
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
        TestBed.overrideComponent(ViewActorComponent, {
            set: {
                providers: [
                    { provide: ActorService, useValue: mockActorService },
                ],
            },
        });

        mockActorService.getActor.and.returnValues(of(mockGetActor));
    });

    it('should create', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetActor.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewActorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should correctly render the component', async () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetActor.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewActorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.loading).toBeFalsy();
        expect(component.error).toBeFalsy();

        const header = fixture.nativeElement.querySelector(
            '[data-testid="header"]'
        ) as HTMLElement;

        expect(header).toBeTruthy();

        const poster = fixture.nativeElement.querySelector(
            '[data-testid="poster"]'
        ) as HTMLElement;

        expect(poster.getAttribute('src')).toBe(
            `https://image.tmdb.org/t/p/w500/${mockGetActor.profile_path}`
        );

        const title = fixture.nativeElement.querySelector(
            '[data-testid="title"]'
        ) as HTMLElement;

        expect(title.textContent?.trim()).toBe(mockGetActor.name);

        const personalData = fixture.nativeElement.querySelector(
            '[data-testid="personalData"]'
        ) as HTMLElement;
        const birthday = new Date(mockGetActor.birthday);
        expect(personalData.textContent?.trim()).toBe(
            `${mockGetActor.gender == 1 ? 'Feminino' : 'Masculino'} - ${formatNumberDate(birthday.getDate() + 1)}/${formatNumberDate(birthday.getMonth() + 1)}/${birthday.getFullYear()} (${calcAge(birthday)} anos)`
        );

        const biograph = fixture.nativeElement.querySelector(
            '[data-testid="biograph"]'
        ) as HTMLElement;

        expect(biograph.querySelector('h2')?.textContent).toBe('Biografia');
        expect(biograph.querySelector('p')?.textContent).toBe(
            mockGetActor.biography
        );

        const birth = fixture.nativeElement.querySelector(
            '[data-testid="birth"]'
        ) as HTMLElement;

        expect(birth.querySelector('h3')?.textContent).toBe(
            'Local de Nascimento:'
        );
        expect(birth.querySelector('p')?.textContent).toBe(
            mockGetActor.place_of_birth
        );

        const knownAs = fixture.nativeElement.querySelector(
            '[data-testid="knownAs"]'
        ) as HTMLElement;

        expect(knownAs.querySelector('h3')?.textContent).toBe(
            'Também Conhecido(a) Como:'
        );
        const names = knownAs.querySelectorAll('p');
        expect(names.length).toBe(mockGetActor.also_known_as.length);
        for (let i = 0; i < mockGetActor.also_known_as.length; i++) {
            expect(names[i].textContent?.trim()).toBe(
                mockGetActor.also_known_as[i].trim()
            );
        }
    });

    it('should load data from service', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetActor.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewActorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(mockActorService.getActor).toHaveBeenCalled();
        expect(component.actorDetails).toBe(mockGetActor);
    });

    it('should issue an error due to lack of id', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({}),
                },
            },
        });
        fixture = TestBed.createComponent(ViewActorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.loading).toBeFalsy();
        expect(component.error).toBeTruthy();

        const title = fixture.nativeElement.querySelector(
            '[data-testid="title"]'
        ) as HTMLElement;
        expect(title).toBeFalsy();
        const error = fixture.nativeElement.querySelector(
            '[data-testid="error"]'
        ) as HTMLElement;
        expect(error).toBeTruthy();
        expect(error.querySelector('h3')?.textContent).toBe(
            'Falha ao buscar os dados :('
        );
    });

    it('should return a correctly gender', () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: {
                snapshot: {
                    paramMap: convertToParamMap({ id: mockGetActor.id }),
                },
            },
        });
        fixture = TestBed.createComponent(ViewActorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        //Female
        component.actorDetails.gender = 1;
        expect(component.mockGender()).toBe('Feminino');

        //Male
        component.actorDetails.gender = 2;
        expect(component.mockGender()).toBe('Masculino');
    });
});

function formatNumberDate(number: number): string {
    if (number <= 9) return '0' + number.toString();
    else return number.toString();
}

function calcAge(birthday: Date) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}
