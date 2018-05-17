import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'nameToNumber'})

export class nameToNumber implements PipeTransform {
    transform(value: string, args?): number {
        let result;
        switch (value.toLowerCase()) {
            case 'one':
                result = 1;
                break;
            case 'two':
                result = 2;
                break;
            case 'three':
                result = 3;
                break;
            case 'four':
                result = 4;
                break;
            default:
                result = value;
        }
        return result;
    }
}