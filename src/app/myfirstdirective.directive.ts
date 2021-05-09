import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyfirstdirective]'
})
export class MyfirstdirectiveDirective {

  constructor(private eleref: ElementRef) { 
    eleref.nativeElement.style.color = 'blue'
  }

}
