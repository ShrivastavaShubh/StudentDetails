import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})
export class StudentdetailsComponent implements OnInit {
  studentDetails: any;
  studallDetail: any;
  Uid: any;

  constructor(public student: StudentService, public fb: FormBuilder, public avtive: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentDetails = this.fb.group({
      fname: [''],
      mname: [''],
      lname: [''],
      age: [''],
      dob: [''],
      gender: [''],
      email: [''],
      mobile: [''],
      state1: [''],
      city1: [''],
      pincode1: [''],
      area1: [''],
      address1: [''],
      street1: [''],
      state2: [''],
      city2: [''],
      pincode2: [''],
      area2: [''],
      address2: [''],
      street2: [''],
    })
    this.getInfo();
  }
  printPage() {
    window.print();
  }
  getInfo() {
    const id = this.avtive.snapshot.params.id;
    this.student.getData("form/" + id).then((res) => {
      this.studallDetail = res.data[0];
      this.studentDetails.patchValue({
        fname: this.studallDetail.firstName,
        mname: this.studallDetail.middleName,
        lname: this.studallDetail.lastName,
        age: this.studallDetail.age,
        dob: this.studallDetail.dob,
        gender: this.studallDetail.gender,
        email: this.studallDetail.email,
        mobile: this.studallDetail.mobile,
        state1: this.studallDetail.permanentAddress.state,
        city1: this.studallDetail.permanentAddress.city,
        pincode1: this.studallDetail.permanentAddress.pincode,
        area1: this.studallDetail.permanentAddress.area,
        address1: this.studallDetail.permanentAddress.address,
        street1: this.studallDetail.temporaryAddress.street,
        state2: this.studallDetail.temporaryAddress.state,
        city2: this.studallDetail.temporaryAddress.city,
        pincode2: this.studallDetail.temporaryAddress.pincode,
        area2: this.studallDetail.temporaryAddress.area,
        address2: this.studallDetail.temporaryAddress.address,
        street2: this.studallDetail.temporaryAddress.street,
      })
    })
  }
}
