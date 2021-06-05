import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyfirstdirective]'
})
export class MyfirstdirectiveDirective {

  constructor(private eleref: ElementRef) { 
    eleref.nativeElement.style.color = 'blue'
  }

}

 
// or setting style using renderer

// Angular has been built from the ground up to work in a number of different environments, 
// including server side via node and on a native mobile device.
// So the Angular team has provided a platform independent way of setting properties on
// our elements via something called a Renderer.

// import { Renderer } from '@angular/core';

// export class MyfirstdirectiveDirective {
//   constructor(private eleref: ElementRef,
//               private renderer: Renderer) {
//     renderer.setElementStyle(el.nativeElement, 'color', 'blue');
//   }
// }



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// HostListener and HostBinding: 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// How to respond to output events that occur on the host element the directive is attached to.
// How to manipulate the host element by binding to its input properties.

// example:

// @Directive({
//   selector: "[appMyfirstdirective]"
// })
// class MyfirstdirectiveDirective {
//   @HostBinding('class.card-outline-primary')private ishovering: boolean;

//   constructor(private el: ElementRef,
//               private renderer: Renderer) {
//     renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
//   }

//   @HostListener('mouseover') onMouseOver() {
//     let part = this.el.nativeElement.querySelector('.card-text');
//     this.renderer.setElementStyle(part, 'display', 'block');
//     this.ishovering = true;
//   }

//   @HostListener('mouseout') onMouseOut() {
//     let part = this.el.nativeElement.querySelector('.card-text');
//     this.renderer.setElementStyle(part, 'display', 'none');
//     this.ishovering = false;
//   }
// }



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Inputs and configurations: Passing values to the directive from template
// can receive the value using @Input decorator in directive class
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// @Directive({
//   selector: "[ccCardHover]"
// })
// class CardHoverDirective {
//   @HostBinding('class.card-outline-primary') private ishovering: boolean;

//   @Input('ccCardHover') config = {
//     querySelector: '.card-text'
//   };

//   constructor(private el: ElementRef,
//               private renderer: Renderer) {
//      renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
//   }

//   @HostListener('mouseover') onMouseOver() {
//     let part = this.el.nativeElement.querySelector(this.config.querySelector);
//     this.renderer.setElementStyle(part, 'display', 'block');
//     this.ishovering = true;
//   }

//   @HostListener('mouseout') onMouseOut() {
//     let part = this.el.nativeElement.querySelector(this.config.querySelector);
//     this.renderer.setElementStyle(part, 'display', 'none');
//     this.ishovering = false;
//   }
// }

// @Component({
//   selector: 'joke',
//   template: `
// <div class="card card-block"
//      [ccCardHover]="{querySelector:'.card-text'}">
//   <h4 class="card-title">{{data.setup}}</h4>
//   <p class="card-text"
//      [style.display]="'none'">{{data.punchline}}</p>
// </div>
//   `
// })
