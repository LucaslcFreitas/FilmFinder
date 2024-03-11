import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ViewCategoryComponent } from './pages/view-category/view-category.component';
import { ViewMovieComponent } from './pages/view-movie/view-movie.component';
import { ViewActorsComponent } from './pages/view-actors/view-actors.component';
import { ViewActorComponent } from './pages/view-actor/view-actor.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nowPlaing', component: ViewCategoryComponent },
    { path: 'popular', component: ViewCategoryComponent },
    { path: 'topRated', component: ViewCategoryComponent },
    { path: 'movie/:id', component: ViewMovieComponent },
    { path: 'actors', component: ViewActorsComponent },
    { path: 'actor/:id', component: ViewActorComponent },
    { path: 'search', component: SearchResultComponent },
];
