## Supported Types

### Basic Types
### We can support boolean, number and string.

`
let decimal: number = 6;
let done: boolean = false;
let color: string = "blue";
`

### Arrays
`
We have two ways of describing the types of arrays.

The first is to use the brackets notation [], like so:

TypeScript
let list: number[] = [1, 2, 3];
The above indicates to TypeScript that this array should only hold numbers.

The second way uses a generic type specifically Array<Type>, like so:

TypeScript
let list: Array<number> = [1, 2, 3];
`

### Functions
`
We can describe a variable as one that will only point to a function, like so:

TypeScript
let fun: Function = () => console.log("Hello");
With TypeScript we can also define the expected return type of a function, like so:

TypeScript
function returnNumber(): number {
  return 1;
}
The above lets TypeScript know that the function should only return a number.
`

### Enum
`
An Enum is a datatype consisting of a set of named values. The names are usually identifiers that behave as constants. Enums were introduced in ES6.

enum Direction {
    Up,
    Down,
    Left,
    Right
}

let go: Direction;
go = Direction.Up;
`

### Class
`
class Person1 {
}

let person: Person1;
let people: Person1[];
`

### Any
`
let notsure: any = 1;
notsure = "hello"; // This is fine since we don't do type checking with any
`

### Type Assertion (Type Inference)
`
Type Inference
If a variable is declared and initialised on one line TypeScript will try to infer, guess, the type of a variable by how it’s declared, for example:

TypeScript
let answer = 42;
answer = "42";
TypeScript inferred that the type of answer was number by the fact we initialised it with a number. When we later on try to assign a string to answer it throws an error.

error TS2322: Type 'string' is not assignable to type 'number'.

Example:
let value: any = "Asim Hussain";
let len: number = (<string>value).length;

`
### Generics
`
class Audio1 {
}
class Video {
}

class Post<T> {
  content: T;
}

let audioPost: Post<Audio1>;
let videoPost: Post<Video>;
`

## Phases or Life Cycles
`
These phases are broadly split up into phases that are linked to the component itself and phases that are linked to the children of that component.

Hooks for the Component
constructor
This is invoked when Angular creates a component or directive by calling new on the class.

ngOnChanges
Invoked every time there is a change in one of th input properties of the component.

ngOnInit
Invoked when given component has been initialized.
This hook is only called once after the first ngOnChanges

ngDoCheck
Invoked when the change detector of the given component is invoked. It allows us to implement our own change detection algorithm for the given component.

Important
ngDoCheck and ngOnChanges should not be implemented together on the same component.
Note
We will cover this hook in more detail in the Advanced Components section at the end of this course.
ngOnDestroy
This method will be invoked just before Angular destroys the component.
Use this hook to unsubscribe observables and detach event handlers to avoid memory leaks.

Hooks for the Component’s Children
These hooks are only called for components and not directives.

Note
We will cover the difference between Components and Directives in the next section.
ngAfterContentInit
Invoked after Angular performs any content projection into the component’s view (see the previous lecture on Content Projection for more info).

ngAfterContentChecked
Invoked each time the content of the given component has been checked by the change detection mechanism of Angular.

ngAfterViewInit
Invoked when the component’s view has been fully initialized.

ngAfterViewChecked
Invoked each time the view of the given component has been checked by the change detection mechanism of Angular.

Note
We’ll dig into the children hooks in more detail in the next lecture.
Adding Hooks
In order to demonstrate how the hooks work we’ll adjust the joke application we’ve been working with so far.

Firstly let’s change the JokeComponent so it hooks into all the phases.

All we need to do is to add functions to the component class matching the hook names above, like so:

TypeScript
class JokeComponent {
  @Input('joke') data: Joke;

  constructor() {
    console.log(`new - data is ${this.data}`);
  }

  ngOnChanges() {
    console.log(`ngOnChanges - data is ${this.data}`);
  }

  ngOnInit() {
    console.log(`ngOnInit  - data is ${this.data}`);
  }

  ngDoCheck() {
    console.log("ngDoCheck")
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}

`

### Understand the difference between view children and content children of a component. Know how to get references to child components in host components.



`
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: "joke",
  template: `
<div class="card card-block">
  <h4 class="card-title">
    <ng-content select=".setup"></ng-content>
  </h4>
  <p class="card-text"
     [hidden]="data.hide">
    <ng-content select=".punchline"></ng-content>
  </p>
  <a class="btn btn-primary"
     (click)="data.toggle()">Tell Me
  </a>
</div>
`
})
class JokeComponent {
  @Input("joke") data: Joke;
}

@Component({
  selector: "joke-list",
  template: `
<h4 #header>View Jokes</h4>
<joke *ngFor="let j of jokes" [joke]="j">
  <span class="setup">{{ j.setup }}?</span>
  <h1 class="punchline">{{ j.punchline }}</h1>
</joke>
<h4>Content Jokes</h4>
<ng-content></ng-content>
`
})
class JokeListComponent implements OnInit, AfterContentInit, AfterViewInit {
  jokes: Joke[] = [
    new Joke(
      "What did the cheese say when it looked in the mirror",
      "Hello-me (Halloumi)"
    ),
    new Joke(
      "What kind of cheese do you use to disguise a small horse",
      "Mask-a-pony (Mascarpone)"
    )
  ];

  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
  @ViewChild("header") headerEl: ElementRef;
  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;

  constructor() {
    console.log(`new - jokeViewChild is ${this.jokeViewChild}`);
    console.log(`new - jokeContentChild is ${this.jokeContentChild}`);
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(
      `ngAfterContentInit - jokeContentChild is ${this.jokeContentChild}`
    );
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);

    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);

    console.log(`ngAfterViewInit - headerEl is ${this.headerEl}`);
    this.headerEl.nativeElement.textContent = "Best Joke Machine";
  }
}

@Component({
  selector: "app",
  template: `
<joke-list>
  <joke [joke]="joke">
    <span class="setup">{{ joke.setup }}?</span>
    <h1 class="punchline">{{ joke.punchline }}</h1>
  </joke>
</joke-list>
`
})
class AppComponent {
  joke: Joke = new Joke(
    "A kid threw a lump of cheddar at me",
    "I thought ‘That’s not very mature’"
  );
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

`

## Built-in Directives
`
### Structural Directives:

It changes the structure of the DOM.
* is prefixed to the structural directives.
*ngIf, *ngFor are the examples of structural directives.


1. NgFor
2. NgIf & NgSwitch


### Attribute directives:

It just changes the appearance of the DOM.
It is not prefixed with *.
ngClass, ngStyle are the examples of attribute directives

1. NgStyle & NgClass
2. NgNonBindable


### More details:

Long-Form Structural Directives
Structural Directives are directives which change the structure of the DOM by adding or removing elements.

There are three built-in structural directives, NgIf, NgFor and NgSwitch.

These directives work by using the HTML5 <ng-template> tag. This is a new tag in HTML which is specifically designed to hold template code. It can sit under the body element but any content inside it is not shown in the browser.

Using ng-template we can write an ngIf expression as:
TypeScript


<ng-template [ngIf]='condition'>
  <p>I am the content to show</p>
</ng-template>


If we go back to our joke app example and replace the hiding and showing of a joke with this template version of ngIf we would end up with:
TypeScript

<ng-template [ngIf]="!data.hide">
  <p class="card-text">
  {{ data.punchline }}
  </p>
</ng-template>


The NgFor version is slightly more complex:
TypeScript

<ng-template ngFor (1)
          let-j (2)
          [ngForOf]="jokes"> (3)
  <joke [joke]="j"></joke>
</ng-template>

This is the NgFor directive itself.
This is another way of declaring a template local reference variable, equivalent to #j.
[ngForOf] is an input property of the NgFor directive.
Syntactic Sugar and *
So if we can write ngIf with ng-template what is all the fuss about *.

When we prepend a directive with * we are telling it to use the element it’s attached to as the template.

Looking at the NgIf example from above, these two snippets of code are equivalent:
TypeScript

<ng-template [ngIf]="!data.hide">
  <p class="card-text">
    {{ data.punchline }}
  </p>
</ng-template>

TypeScript
<p class="card-text"
   *ngIf="!data.hide">
  {{ data.punchline }}
</p>

Finally, looking at the more complex NgFor example from above, these two snippets of code are also equivalent:
TypeScript

<ng-template ngFor
          let-j
          [ngForOf]="jokes">
  <joke [joke]="j"></joke>
</ng-template>

TypeScript
<joke *ngFor="let j of jokes"
      [joke]="j">
</joke>


Summary
Structural directives are a type of directive which changes the structure of the DOM.

We use the <ng-template> tag to define the element we want to insert into the DOM.

We can prepend the directive name with * to skip having to define a <ng-template> and have the directive use the element it’s attached to as the template.

`


## 