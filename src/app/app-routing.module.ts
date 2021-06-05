import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import {AlwaysAuthGuard} from './myservice.service';
import { ModelformComponent } from './modelform/modelform.component';
import {TemplateformComponent} from './templateform/templateform.component'





const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"child", component:ChildComponent, canActivate:[AlwaysAuthGuard]},
  {path:"modalform", component:ModelformComponent},
  {path:'templateform', component:TemplateformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AlwaysAuthGuard]
})
export class AppRoutingModule { }
