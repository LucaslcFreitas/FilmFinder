import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../../shared/models/movie';
import { ListMoviesComponent } from '../../shared/components/list-movies/list-movies.component';

@Component({
    selector: 'app-search-result',
    standalone: true,
    imports: [HttpClientModule, ListMoviesComponent],
    providers: [MovieService],
    templateUrl: './search-result.component.html',
    styleUrl: './search-result.component.sass',
})
export class SearchResultComponent {
    query: string = '';
    movies: Movie[] = [];
    loading: boolean = true;
    error: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService
    ) {
        this.route.queryParams.subscribe((p) => {
            if (p['q'] && this.query != p['q']) {
                this.query = p['q'] || '';
                this.search();
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    search() {
        this.movies = [];
        this.loading = true;
        this.error = false;

        this.movieService.searchMovies(this.query).subscribe(
            (response) => {
                this.movies = response.results;
                this.loading = false;
                this.error = false;
            },
            (error) => {
                console.log('here');
                console.log(error);
                this.loading = false;
                this.error = true;
            }
        );
    }
}
