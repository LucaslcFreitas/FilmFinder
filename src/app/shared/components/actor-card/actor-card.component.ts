import { Component, Input } from '@angular/core';
import { Cast } from '../../models/cast';
import { RouterModule } from '@angular/router';
import { Actor } from '../../models/actor';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-actor-card',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './actor-card.component.html',
    styleUrl: './actor-card.component.sass',
})
export class ActorCardComponent {
    @Input() actor!: Cast | Actor;
    baseUrlImage: string = 'https://image.tmdb.org/t/p/w200';

    getSubTitle(): string {
        if ('character' in this.actor) {
            return this.actor.character;
        } else if ('original_name' in this.actor) {
            return this.actor.original_name;
        } else {
            return '';
        }
    }
}
