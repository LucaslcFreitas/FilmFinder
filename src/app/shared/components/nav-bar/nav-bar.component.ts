import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faMagnifyingGlass,
    faSun,
    faMoon,
    faBars,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [RouterModule, CommonModule, FontAwesomeModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.sass',
})
export class NavBarComponent {
    //Temp
    theme = 'dark';

    isOpenMenu = false;

    iconSearch = faMagnifyingGlass;
    iconTheme = this.theme === 'dark' ? faMoon : faSun;
    iconMenu = this.isOpenMenu ? faXmark : faBars;

    handleChangeTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        console.log(this.theme);
        this.iconTheme = this.theme === 'dark' ? faMoon : faSun;
    }

    handleOpenMenu() {
        this.isOpenMenu = !this.isOpenMenu;
        this.iconMenu = this.isOpenMenu ? faXmark : faBars;
    }
}
