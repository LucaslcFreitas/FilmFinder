import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { LocalStorageMock } from './localStorageMock';

describe('FavoriteService', () => {
    let service: FavoriteService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FavoriteService],
        });
        const localStorageMock = new LocalStorageMock();
        spyOnProperty(window, 'localStorage').and.returnValue(localStorageMock);

        service = TestBed.inject(FavoriteService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should favorite a movie', () => {
        service.favoriteMovie('123');
        expect(localStorage.getItem('mv123')).toBeTruthy();
    });

    it('should unfavorite a movie', () => {
        service.favoriteMovie('123');
        service.unfavoriteMovie('123');
        expect(localStorage.getItem('mv123')).toBeFalsy();
    });

    it('should check if the film is favorited', () => {
        expect(service.isFavorite('123')).toBeFalsy();

        service.favoriteMovie('123');

        expect(service.isFavorite('123')).toBeTruthy();
    });
});
