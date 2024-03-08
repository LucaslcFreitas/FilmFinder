import { Component, Input } from '@angular/core';
import { Cast } from '../../models/cast';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActorCardComponent } from '../actor-card/actor-card.component';
import { Actor } from '../../models/actor';

@Component({
    selector: 'app-list-actors',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, ActorCardComponent],
    templateUrl: './list-actors.component.html',
    styleUrl: './list-actors.component.sass',
})
export class ListActorsComponent {
    @Input() actors!: Cast[] | Actor[];
    @Input() title: string = '';
    @Input() loading: boolean = true;
    @Input() inError?: boolean = false;
}
