import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titleCase'})

export class titleCase implements PipeTransform {
    transform(value: string, args?): string {
        if (!value) {
            return '';
        } else {
            return value.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
        }
    }
}