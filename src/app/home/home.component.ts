import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { combineLatest } from 'rxjs';
import { ChildComponent } from '../child/child.component'
import { MyserviceService } from '../myservice.service'


import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-home',
  animations: [
    trigger('myAnimations', [
      // ...
      state('red', style({
        // height: '200px',
        // opacity: 1,
        // backgroundColor: 'yellow'
        fontSize: '28px',
        color: 'red'
      })),
      state('green', style({
        fontSize: '28px',
        color: 'green'
      })),
      // transition('open => closed', [
      //   animate('1s')
      // ]),
      // transition('closed => open', [
      //   animate('0.5s')
      // ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private MyserviceServiceref: MyserviceService, @Inject('Globalval') private Globalvalref, @Inject("secondGlobVar") private secondGlobvarRef) {
    this.create_promise()
  }

  ngOnInit(): void {
    this.parent_wrapper_func()
    this.Globalvalref
    console.log(this.Globalvalref)
    console.log(this.secondGlobvarRef)
  }

  color = "red"
  changeFontColor() {
    if (this.color == "red") {
      this.color = "green"
    }
    else {
      this.color = "red"
    }
  }

  @ViewChild(ChildComponent)
  private childcpmt_ref_var: ChildComponent

  parent_wrapper_func = () => {
    setTimeout(() => {
      console.log("on int....")

      this.childcpmt_ref_var.childfunction()
      this.MyserviceServiceref.myFirstService()
      console.log(this.MyserviceServiceref.serviceVariable)
      this.myObservablewrapper()
      this.callGetApifromService()

    }, 1)
  }

  myObservablewrapper() {
    let unsubscribeObj = this.MyserviceServiceref.myObservable.subscribe({
      next(data) { console.log(data) },
      error(data) { console.log(data) },
      complete() { }
    });
    // unsubscribeObj.unsubscribe()
  }

  callGetApifromService() {
    this.MyserviceServiceref.getRequest().subscribe((res) => {
      console.log(res)
    })
  }

  //aync pipe
  public Mypromisefunc: Promise<string> | null = null
  public resolve: Function | null = null
  create_promise() {
    console.log("creating promise func...")
    this.Mypromisefunc = new Promise((resolve, reject) => {
      this.resolve = resolve

    })
  }

  callasync() {
    this.resolve("Hi I am from promise")
  }

  //using in built in pipes
  public myNumber = 12.222
  public myJSON = { name: "manju", age: 23 }
  public json_items = { name: "manju", age: 23, address: "Hassan" }


  //form
  public C: number
  public F: number

  updateCelsius() {
    console.log("will update C...", this.F)
    this.C = this.F+2
    if(this.F == null){
      this.C = null
    }
  }

  updateFah() {
    console.log("will update F...")
    this.F = this.C-2
    if(this.C == null){
      this.F = null
    }
  }



}