import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
    standalone: true,
})
export class PercentagePipe implements PipeTransform {
    transform(value: number): string {
        const newValue = Math.floor(value);
        return newValue.toString() + '%';
    }
}
