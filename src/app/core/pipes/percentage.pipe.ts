import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
    standalone: true,
})
export class PercentagePipe implements PipeTransform {
    transform(value: number): string {
        if (!value) return '0%';

        const newValue = Math.floor(value);

        if (!newValue) return '0%';

        return newValue.toString() + '%';
    }
}
