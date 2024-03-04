import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FontAwesomeModule, NavBarComponent, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent {}
