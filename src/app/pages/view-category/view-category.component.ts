import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../shared/models/movie';
import { MovieService } from '../../core/services/movie/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { ListMoviesComponent } from '../../shared/components/list-movies/list-movies.component';
import { SelectPageComponent } from '../../shared/components/select-page/select-page.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-view-category',
    standalone: true,
    imports: [HttpClientModule, ListMoviesComponent, SelectPageComponent],
    providers: [MovieService],
    templateUrl: './view-category.component.html',
    styleUrl: './view-category.component.sass',
})
export class ViewCategoryComponent implements OnInit {
    title: string = '';
    movies: Movie[] = [];
    loading: boolean = true;
    error: boolean = false;
    page: number = 1;
    pages: number = 2;
    currentUrl = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((p) => {
            if (this.page.toString() != p['page']) {
                this.loadMovies();
                this.page = Number(p['page']) || 1;
            }
        });
    }

    private loadMovies() {
        this.movies = [];
        const category = this.router.url;
        this.loading = true;

        this.route.queryParams.subscribe((params) => {
            this.page = Number(params['page']) || 1;
        });

        if (category.startsWith('/nowPlaying')) {
            this.titleService.setTitle('Últimos Lançamentos | FilmFinder');
            this.title = 'Últimos Lançamentos';
            this.currentUrl = '/nowPlaying';
            this.movieService.getNowPlayingMovies(this.page).subscribe(
                (response) => {
                    this.movies = response.results;
                    this.loading = false;
                    this.pages = response.total_pages;
                    this.error = false;
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.error = true;
                }
            );
        } else if (category.startsWith('/popular')) {
            this.titleService.setTitle('Filmes Populares | FilmFinder');
            this.title = 'Filmes Populares';
            this.currentUrl = '/popular';
            this.movieService.getPopularMovies(this.page).subscribe(
                (response) => {
                    this.movies = response.results;
                    this.loading = false;
                    this.pages = response.total_pages;
                    this.error = false;
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.error = true;
                }
            );
        } else {
            this.titleService.setTitle('Mais Bem Avaliados | FilmFinder');
            this.title = 'Mais Bem Avaliados';
            this.currentUrl = '/topRated';
            this.movieService.getTopRatedMovies(this.page).subscribe(
                (response) => {
                    this.movies = response.results;
                    this.loading = false;
                    this.pages = response.total_pages;
                    this.error = false;
                },
                (error) => {
                    console.log(error);
                    this.loading = false;
                    this.error = true;
                }
            );
        }
    }
}
