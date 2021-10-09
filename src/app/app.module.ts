import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { AddressComponent } from './address/address.component';
import { UploadComponent } from './upload/upload.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    AddressComponent,
    UploadComponent,
    StudentdetailsComponent
  ],
  imports: [
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule ,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [MatDatepickerModule,DatePipe,MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
