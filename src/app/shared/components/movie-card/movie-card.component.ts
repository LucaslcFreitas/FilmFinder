import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartChecked } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartUnchecked } from '@fortawesome/free-regular-svg-icons';
import { PercentagePipe } from '../../../core/pipes/percentage.pipe';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';

@Component({
    selector: 'app-movie-card',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, RouterModule, PercentagePipe],
    providers: [FavoriteService],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.sass',
})
export class MovieCardComponent implements OnInit {
    @Input() movie!: Movie;
    baseUrlImage: string = 'https://image.tmdb.org/t/p/w200';

    isFavorite: boolean = false;

    //Icons
    iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;

    constructor(
        private router: Router,
        private favoriteService: FavoriteService
    ) {}

    ngOnInit(): void {
        this.isFavorite = this.favoriteService.isFavorite(
            this.movie.id.toString()
        );
        this.iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;
    }

    handleFavorite(e: Event) {
        e.stopPropagation();
        if (!this.isFavorite) {
            this.favoriteService.favoriteMovie(this.movie.id.toString());
        } else {
            this.favoriteService.unfavoriteMovie(this.movie.id.toString());
        }

        this.isFavorite = !this.isFavorite;
        this.iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;
    }

    handleOpenMovie() {
        this.router.navigate([`movie/${this.movie.id}`]);
    }
}
