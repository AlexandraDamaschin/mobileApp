import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromUnix',
})
export class FromUnixPipe implements PipeTransform {

  
  transform(value: string, ...args) {
    return moment.unix(parseInt(value)).format(args[0]);
  }
}
