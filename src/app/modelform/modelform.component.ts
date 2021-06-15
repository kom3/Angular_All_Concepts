import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators // to validate the input data in real time(as soon as the user enters)
} from '@angular/forms'

@Component({
  selector: 'app-modelform',
  templateUrl: './modelform.component.html',
  styleUrls: ['./modelform.component.scss']
})
export class ModelformComponent implements OnInit {

  constructor() { }

  langs: string[] = [
    "English",
    "French",
    "German"
  ]

  // Steps:
  // Create a Template form and Model form:
  // 1. Create a form template in html
  // 2. Create a form model in component like below using FormGroup and FormControl
  // 3. Link a form group with form template
  // 4. To do that import ReactiveFormsModule and register it in ngModule (app.module.ts)
  // 5. and Attach formGroup directive(comes from ReactiveFormsModule) in form template and assign myform instance to it [formGroup]="myform"
  // [formGroup]="myform" helps to link form template to form model
  // FormControl(initial_value, Validator or list of Validators )

  myform: FormGroup //create an instance of FormGroup

  ngOnInit(): void {
    this.myform = new FormGroup({
      // nested form
      name: new FormGroup({

        firstname: new FormControl("", Validators.required), //input controller

        lastname: new FormControl("", Validators.required) //input controller

      }),
      // 

      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]), //input controller

      password: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ]), //input controller
      language: new FormControl() //input controller

    })
  }

  // Form submit function and reset
  onSubmitfunc = () => {
    if (this.myform.valid) {
      console.log("submitted!", this.myform.value)
      this.myform.reset()
    }
    else{
      console.log("Invalid form!")
    }

  }



}
