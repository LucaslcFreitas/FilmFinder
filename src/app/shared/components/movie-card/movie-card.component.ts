import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartChecked } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartUnchecked } from '@fortawesome/free-regular-svg-icons';
import { PercentagePipe } from '../../../core/pipes/percentage.pipe';

@Component({
    selector: 'app-movie-card',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, RouterModule, PercentagePipe],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.sass',
})
export class MovieCardComponent {
    @Input() movie!: Movie;
    baseUrlImage: string = 'https://image.tmdb.org/t/p/w200';

    isFavorite: boolean = false;

    //Icons
    iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;

    handleFavorite() {
        this.isFavorite = !this.isFavorite;
        this.iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;
    }

    test() {
        console.log('Test');
    }
}
