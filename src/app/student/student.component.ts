import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'] 
})
export class StudentComponent implements OnInit {
  isvalid=false;
  Dob: any;
  studentInfo:any;
  constructor(public router: Router,public student:StudentService, private datePipe: DatePipe,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentInfo = this.fb.group({
      fname: ['',Validators.required],
      mname: ['',Validators.required],
      lname: ['',Validators.required],
      dob: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',Validators.required],
      gender: ['',Validators.required],
      age: ['',Validators.required],
    })
    
  }
  get f() { return this.studentInfo.controls; }
  async goToAddress() {
    this.isvalid=true;
    this.Dob = this.datePipe.transform(this.studentInfo.get('dob').value, 'dd/MM/yyyy');
    console.log(this.Dob.toString());
    const info = {
      firstName: this.studentInfo.get('fname').value,
      middleName: this.studentInfo.get('mname').value,
      lastName: this.studentInfo.get('lname').value,
      dob: this.Dob.toString(),
      email: this.studentInfo.get('email').value,
      mobile: this.studentInfo.get('mobile').value,
      gender: this.studentInfo.get('gender').value,
      age: this.studentInfo.get('age').value,
    }

    console.log("form user", info);
    if(this.studentInfo.invalid)
    {
      return;
    }
    try {
      let response = await this.postData(info);
  } catch(e) {
      console.log(e);
  }
  }
  
  postData(info:any)
  {
    this.student.postUser('user', info).then((res) => {
      const id =res.data.userId;
      this.studentInfo.reset();
      this.router.navigate(['address/'+id]);
      this.isvalid=false;
      this.student.uid.next(id)
    })
  }
}
