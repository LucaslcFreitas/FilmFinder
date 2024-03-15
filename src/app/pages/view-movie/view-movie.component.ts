import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie/movie.service';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { MovieDetails } from '../../shared/models/movie-details';
import { HttpClientModule } from '@angular/common/http';
import { ListActorsComponent } from '../../shared/components/list-actors/list-actors.component';
import { CommonModule } from '@angular/common';
import { PercentagePipe } from '../../core/pipes/percentage.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartChecked } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartUnchecked } from '@fortawesome/free-regular-svg-icons';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-view-movie',
    standalone: true,
    imports: [
        HttpClientModule,
        ListActorsComponent,
        CommonModule,
        PercentagePipe,
        FontAwesomeModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        MovieService,
        FavoriteService,
        { provide: LOCALE_ID, useValue: 'pt' },
    ],
    templateUrl: './view-movie.component.html',
    styleUrl: './view-movie.component.sass',
})
export class ViewMovieComponent implements OnInit {
    movieDetails!: MovieDetails;
    backdropPath: string = '';
    loading: boolean = true;
    error: boolean = false;

    imgPath: string = 'https://image.tmdb.org/t/p/w500/';

    isFavorite: boolean = false;

    //Icons
    iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private favoriteService: FavoriteService,
        private titleService: Title
    ) {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadMovie(id);
        this.titleService.setTitle('FilmFinder');
    }

    ngOnInit(): void {
        this.isFavorite = this.favoriteService.isFavorite(
            this.route.snapshot.paramMap.get('id') as string
        );
        this.iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;
    }

    loadMovie(id: string | null) {
        if (id) {
            this.loading = true;
            this.error = false;
            this.movieService.getMovie(id).subscribe(
                (response) => {
                    this.movieDetails = response;
                    this.backdropPath = response.backdrop_path;
                    this.loading = false;
                    this.error = false;
                    this.titleService.setTitle(
                        `${response.title} | FilmFinder`
                    );
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.error = true;
                }
            );
        } else {
            this.loading = false;
            this.error = true;
        }
    }

    handleFavorite() {
        if (!this.isFavorite) {
            this.favoriteService.favoriteMovie(this.movieDetails.id.toString());
        } else {
            this.favoriteService.unfavoriteMovie(
                this.movieDetails.id.toString()
            );
        }

        this.isFavorite = !this.isFavorite;
        this.iconHeart = this.isFavorite ? faHeartChecked : faHeartUnchecked;
    }
}
