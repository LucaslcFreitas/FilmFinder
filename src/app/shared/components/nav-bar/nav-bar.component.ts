import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faMagnifyingGlass,
    faSun,
    faMoon,
    faBars,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
    FormsModule,
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.sass',
})
export class NavBarComponent implements OnInit {
    //Temp
    theme = 'dark';

    isOpenMenu = false;

    iconSearch = faMagnifyingGlass;
    iconTheme = this.theme === 'dark' ? faMoon : faSun;
    iconMenu = this.isOpenMenu ? faXmark : faBars;

    searchForm!: FormGroup;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            search: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
        });
    }

    getSearch() {
        return this.searchForm.get('search');
    }

    handleChangeTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        console.log(this.theme);
        this.iconTheme = this.theme === 'dark' ? faMoon : faSun;
    }

    handleOpenMenu() {
        this.isOpenMenu = !this.isOpenMenu;
        this.iconMenu = this.isOpenMenu ? faXmark : faBars;
    }

    handleSearch() {
        if (this.searchForm.invalid) {
            console.log(this.searchForm.get('search')?.errors);
            return;
        }

        console.log('Search');
        this.router.navigate(['/search'], {
            queryParams: { q: this.getSearch()?.value },
        });
    }
}
