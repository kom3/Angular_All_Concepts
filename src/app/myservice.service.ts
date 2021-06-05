import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(protected http: HttpClient) { }

  myFirstService() {
    console.log("My First service is accesssible")
  }

  serviceVariable = "serviceVariable"

  myObservable = new Observable((observer) => {
    let mydatavar = "Sorry, I came late..."
    setTimeout(() => {
      observer.next(mydatavar)
      observer.complete()
    }, 5000);
    observer.next("My second msg from observable function")
    // observer.error("This is error from observer")
  })

  getRequest() {
    const url = "api/hello"
    return this.http.get(url)
  }
}

postRequest(){
   const url = "api/create"
   const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
   const data = {"name":"manju", "age":23}
   return this.http.post(url, data, { headers: headers })
}


@Injectable()
export class AlwaysAuthGuard implements CanActivate {	
  canActivate() {
    return true;
  }
}
