import { Component, OnInit } from '@angular/core';
import { ListMoviesComponent } from '../../shared/components/list-movies/list-movies.component';
import { Movie } from '../../shared/models/movie';
import { MovieService } from '../../core/services/movie/movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ListMoviesComponent, HttpClientModule],
    providers: [MovieService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
    //Now Plaing movies
    moviesNowPlaing: Movie[] = [];
    loadingNowPlaing: boolean = true;

    //Popular movies
    moviesPopular: Movie[] = [];
    loadingPopular: boolean = true;

    //TopRated movies
    moviesTopRated: Movie[] = [];
    loadingTopRated: boolean = true;

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        //Now Plaing
        this.movieService.getNowPlaingMovies().subscribe(
            (response) => {
                this.moviesNowPlaing = response.results;
                this.loadingNowPlaing = false;
            },
            (error) => {
                console.log(error);
            }
        );

        //Popular
        this.movieService.getPopularMovies().subscribe(
            (response) => {
                this.moviesPopular = response.results;
                this.loadingPopular = false;
            },
            (error) => {
                console.log(error);
            }
        );

        //TopRated
        this.movieService.getTopRatedMovies().subscribe(
            (response) => {
                this.moviesTopRated = response.results;
                this.loadingTopRated = false;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
