import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';

@Component({
    selector: 'app-list-movies',
    standalone: true,
    imports: [CommonModule, RouterModule, MovieCardComponent],
    templateUrl: './list-movies.component.html',
    styleUrl: './list-movies.component.sass',
})
export class ListMoviesComponent implements OnInit, OnChanges {
    @Input() movies: Movie[] = [];
    @Input() title: string = '';
    @Input() loading: boolean = true;
    @Input() isDemo?: boolean = false;
    @Input() showMoreLink?: string = '';

    listMovies: Movie[] = [];

    ngOnInit(): void {
        this.listMovies = this.isDemo ? this.movies.slice(0, 6) : this.movies;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['movies'].previousValue != changes['movies'].currentValue) {
            this.listMovies = this.isDemo
                ? this.movies.slice(0, 6)
                : this.movies;
        }
    }
}
