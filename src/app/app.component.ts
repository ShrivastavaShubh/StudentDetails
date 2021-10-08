import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from './student.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
tab=0;
  constructor(public student: StudentService) {
  }
  ngOnInit() {
    this.student.index.subscribe((res:any)=>
    {
      this.tab=res;
    })
  }
}
