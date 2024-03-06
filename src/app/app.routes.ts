import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ViewCategoryComponent } from './pages/view-category/view-category.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nowPlaing', component: ViewCategoryComponent },
    { path: 'popular', component: ViewCategoryComponent },
    { path: 'topRated', component: ViewCategoryComponent },
];
