import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-select-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './select-page.component.html',
    styleUrl: './select-page.component.sass',
})
export class SelectPageComponent implements OnInit, OnChanges {
    @Input() currentUrl!: string;
    @Input() page!: number;
    @Input() totalPages!: number;
    @Input() otherParams?: string = '';

    pages: { value: string; selected: boolean }[] = [];

    ngOnInit(): void {
        this.calcPages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['totalPages']?.previousValue !=
                changes['totalPages']?.currentValue ||
            changes['page']?.previousValue != changes['page']?.currentValue
        ) {
            this.calcPages();
        }
    }

    private calcPages() {
        this.pages = [];
        const maxPagesToShow = 7;
        let startPage: number, endPage: number;

        if (this.totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = this.totalPages;
        } else {
            const halfPagesToShow = Math.floor(maxPagesToShow / 2);
            if (this.page <= halfPagesToShow) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (this.page + halfPagesToShow >= this.totalPages) {
                startPage = this.totalPages - maxPagesToShow + 1;
                endPage = this.totalPages;
            } else {
                startPage = this.page - halfPagesToShow;
                endPage = this.page + halfPagesToShow;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            this.pages.push({
                value: i.toString(),
                selected: i === this.page,
            });
        }
    }
}
