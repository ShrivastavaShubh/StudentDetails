import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { State, City } from 'country-state-city';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { createNull } from 'typescript';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  hasAdd = false;
  stateList: any;
  state_id1: any = null;
  state_id2: any = null;
  cityList1: any = null;
  cityList2: any = null;
  address: any;
  address1: any;
  id: any;
  studId: any;
  checked = false;
  constructor(public avtive: ActivatedRoute, public fb: FormBuilder, public student: StudentService, public router: Router) {
    this.studId = this.avtive.snapshot.params.id;
  }

  ngOnInit(): void {
    this.address = this.fb.group({
      state: [null, Validators.required],
      city: [null, Validators.required],
      area: ['', Validators.required],
      street: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      state1: [null, Validators.required],
      city1: [null, Validators.required],
      area1: ['', Validators.required],
      street1: ['', Validators.required],
      pincode1: ['', Validators.required],
      address1: ['', Validators.required]

    })
    this.stateList = State.getStatesOfCountry('IN');
    console.log(this.stateList);
    this.address.controls.state.valueChanges.subscribe((val: any) => {
      console.log(val);
      this.cityList1 = City.getCitiesOfState('IN', val);
    })
    this.address.controls.state1.valueChanges.subscribe((val: any) => {
      this.cityList2 = City.getCitiesOfState('IN', val);
    })
  }

  get T() { return this.address.controls; }
  showOptions(eve: MatCheckboxChange) {
    if (eve.checked) {
      this.address.patchValue({
        state1: this.address.controls.state.value,
        city1: this.address.controls.city.value,
        street1: this.address.controls.street.value,
        area1: this.address.controls.area.value,
        address1: this.address.controls.address.value,
        pincode1: this.address.controls.pincode.value
      });
    }
    else {
      this.address.patchValue({
        state1: [''],
        city1: [''],
        street1: [''],
        area1: [''],
        address1: [''],
        pincode1: ['']
      });
    }
  }
  getCitylist() {

    this.cityList1 = City.getCitiesOfState('IN', this.state_id1);
  }
  getCitylist1() {

    this.cityList2 = City.getCitiesOfState('IN', this.state_id2);
  }

  goToUpload() {
    this.address1 = this.fb.group({
      temporaryAddress: this.fb.group({
        state: this.address.controls.state.value,
        city: this.address.controls.city.value,
        area: this.address.controls.area.value,
        street: this.address.controls.street.value,
        pincode: this.address.controls.pincode.value,
        address: this.address.controls.address.value
      }),
      permanentAddress: this.fb.group({
        state: this.address.controls.state1.value,
        city: this.address.controls.city1.value,
        area: this.address.controls.area1.value,
        street: this.address.controls.street1.value,
        pincode: this.address.controls.pincode1.value,
        address: this.address.controls.address1.value
      })
    })

    this.hasAdd = true;
    const address = {
      userId: this.avtive.snapshot.params.id,
      ...this.address1.value
    }
    if (this.address.invalid) {
      return;
    }
    this.student.postUser('address', address).then((res) => {
      this.address.reset();
      this.router.navigate(['upload/' + this.studId]);
      this.hasAdd = false;
    })
  }

}
