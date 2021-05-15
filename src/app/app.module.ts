import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChildComponent } from './child/child.component';
import { MyserviceService } from './myservice.service';
import { MyfirstpipPipe } from './myfirstpip.pipe';
import { MyfirstdirectiveDirective } from './myfirstdirective.directive'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChildComponent,
    MyfirstpipPipe,
    MyfirstdirectiveDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [MyserviceService, { provide: 'Globalval', useValue: "This is a First global value" }, { provide: "secondGlobVar", useValue: "This is a second global value" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
