import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FontAwesomeModule, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent {
    title = 'FilmFinder';
}
