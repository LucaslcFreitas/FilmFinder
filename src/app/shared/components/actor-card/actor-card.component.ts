import { Component, Input } from '@angular/core';
import { Cast } from '../../models/cast';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-actor-card',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './actor-card.component.html',
    styleUrl: './actor-card.component.sass',
})
export class ActorCardComponent {
    @Input() actor!: Cast;
    baseUrlImage: string = 'https://image.tmdb.org/t/p/w200';
}
