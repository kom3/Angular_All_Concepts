import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfirstpip'
})
export class MyfirstpipPipe implements PipeTransform {

  transform(value: string, fname: string, lname: string): string {
    return `${value} ${fname} ${lname}`;
  }

}
