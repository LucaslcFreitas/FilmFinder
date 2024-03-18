import { TestBed } from '@angular/core/testing';

import { ActorService } from './actor.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { environment, mockGetActor, mockGetPopularActors } from './actor.mock';

describe('ActorService', () => {
    let service: ActorService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ActorService);
        httpMock = TestBed.inject(HttpTestingController);

        //Mock api key
        service.apiKey = environment.apiKey;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch data from popular actors', () => {
        service.getPopularActors().subscribe((data) => {
            expect(data).toEqual(mockGetPopularActors);
        });

        const req = httpMock.expectOne(
            'https://api.themoviedb.org/3/person/popular?api_key=123456&language=pt-BR&page=1'
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockGetPopularActors);
    });

    it('should fetch data from get actor', () => {
        const actorId: string = '123';

        service.getActor(actorId).subscribe((data) => {
            expect(data).toEqual(mockGetActor);
        });

        const req = httpMock.expectOne(
            `https://api.themoviedb.org/3/person/${actorId}?api_key=123456&language=pt-BR&append_to_response=movie_credits`
        );
        expect(req.request.method).toBe('GET');

        req.flush(mockGetActor);
    });
});
