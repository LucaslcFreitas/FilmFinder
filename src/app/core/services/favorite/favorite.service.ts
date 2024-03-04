import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {
    constructor() {}

    favoriteMovie(id: string): void {
        localStorage.setItem(`mv${id}`, 'true');
    }

    unfavoriteMovie(id: string): void {
        localStorage.removeItem(`mv${id}`);
    }

    isFavorite(id: string): boolean {
        return localStorage.getItem(`mv${id}`) != null;
    }
}
