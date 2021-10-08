import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { StudentComponent } from './student/student.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
  {
    path:'',
    component:StudentComponent
  },
  {
    path:'address/:id',
    component:AddressComponent
  },
  {
    path:'upload/:id',
    component:UploadComponent
  },
  {
    path:'details/:id',
    component:StudentdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
