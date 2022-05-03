import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let zoneOffset = (new Date(value)).getTimezoneOffset() * 60000;
    let mins = new Date(value).getTime() - zoneOffset;
    let iso = (new Date(mins)).toISOString().replace('Z', '').replace('T', ' ');
    return iso;
  }

}
