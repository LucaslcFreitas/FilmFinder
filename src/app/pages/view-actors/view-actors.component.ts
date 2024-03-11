import { Component } from '@angular/core';
import { ListActorsComponent } from '../../shared/components/list-actors/list-actors.component';
import { SelectPageComponent } from '../../shared/components/select-page/select-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorService } from '../../core/services/actor/actor.service';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../../shared/models/actor';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-view-actors',
    standalone: true,
    imports: [ListActorsComponent, HttpClientModule, SelectPageComponent],
    providers: [ActorService],
    templateUrl: './view-actors.component.html',
    styleUrl: './view-actors.component.sass',
})
export class ViewActorsComponent {
    actors: Actor[] = [];
    loading: boolean = true;
    error: boolean = false;
    page: number = 1;
    pages: number = 2;
    currentUrl = '/actors';

    constructor(
        private route: ActivatedRoute,
        private actorService: ActorService,
        private titleService: Title
    ) {
        route.queryParams.subscribe((p) => {
            if (this.page.toString() != p['page']) {
                this.loadActors();
                this.page = Number(p['page']) || 1;
            }
        });
        this.titleService.setTitle('Atores Populares | FilmFinder');
    }

    loadActors() {
        this.actors = [];
        this.loading = true;
        this.error = false;

        this.route.queryParams.subscribe((params) => {
            this.page = Number(params['page']) || 1;
        });

        this.actorService.getPopularActors(this.page).subscribe(
            (response) => {
                this.actors = response.results;
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
