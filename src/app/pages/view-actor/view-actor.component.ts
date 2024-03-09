import { Component } from '@angular/core';
import { ActorService } from '../../core/services/actor/actor.service';
import { HttpClientModule } from '@angular/common/http';
import { ActorDetails } from '../../shared/models/actor-details';
import { ActivatedRoute } from '@angular/router';
import { ListMoviesComponent } from '../../shared/components/list-movies/list-movies.component';
import { CommonModule } from '@angular/common';
import { AgePipe } from '../../core/pipes/age.pipe';

@Component({
    selector: 'app-view-actor',
    standalone: true,
    imports: [HttpClientModule, ListMoviesComponent, CommonModule, AgePipe],
    providers: [ActorService],
    templateUrl: './view-actor.component.html',
    styleUrl: './view-actor.component.sass',
})
export class ViewActorComponent {
    actorDetails!: ActorDetails;
    loading: boolean = true;
    error: boolean = false;

    imgPath: string = 'https://image.tmdb.org/t/p/w500/';

    constructor(
        private route: ActivatedRoute,
        private actorService: ActorService
    ) {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadActor(id);
    }

    loadActor(id: string | null) {
        if (id) {
            this.loading = true;
            this.error = false;
            this.actorService.getActor(id).subscribe(
                (response) => {
                    this.actorDetails = response;
                    this.loading = false;
                    this.error = false;
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

    mockGender(): string {
        switch (this.actorDetails.gender) {
            case 1:
                return 'Feminino';
                break;
            case 2:
                return 'Masculino';
                break;
            default:
                return '';
        }
    }
}
