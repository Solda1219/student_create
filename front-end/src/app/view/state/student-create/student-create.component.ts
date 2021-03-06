import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./group-organize.component.scss']
})
export class StudentCreateComponent implements OnInit {
  stateId = 0;
  loading;
  moneyValid = true;
  formGroup: FormGroup;
  constructor(
    public cf: CommonFunctionService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.stateId = parseInt(this.actRoute.snapshot.params.stateId);
    var currentTime = new Date();
    var currentTimeString = this.cf.getChineseTime(currentTime)
    this.formGroup = this._formBuilder.group({
      stateId: [this.stateId, Validators.required],
      name: ['', Validators.required],
      school: ['', Validators.required],
      branch: ['', Validators.required],
      governorate: ['', Validators.required],
      institute: [''],
      phone: [''],
      phone_second: [''],
      poster: [''],
      code: [''],
      confirmCode: [''],
      identification: [''],
      notes: [''],
      firstInstallment: [0],
      first_ins_date: [''],
      first_ins_invoice: ['0'],
      secondInstallment: [0],
      second_ins_date: [''],
      second_ins_invoice: ['0'],
      
      thirdInstallment: [0],
      third_ins_date: [''],
      third_ins_invoice: ['0'],
      forthInstallment: [0],
      forth_ins_date: [''],
      forth_ins_invoice: ['0'],
      remaining: [0],
      totalAmount: [0]
    });
    this.loading = true;
  }
  create() {
    if(!this.formGroup.valid){
      this.userService.errorMessage("Please input all input field!");
      return;
    }

    if (this.formGroup.value.remaining < 0 || this.formGroup.value.totalAmount < this.formGroup.value.firstInstallment+this.formGroup.value.secondInstallment+this.formGroup.value.thirdInstallment+ this.formGroup.value.forthInstallment) {
      this.moneyValid = false;
      this.userService.errorMessage("Total money must be same with first + second + third + forth installment + remain amount!");
      return;
    }
    let remaining_amount = this.formGroup.value.totalAmount - this.formGroup.value.firstInstallment - this.formGroup.value.secondInstallment - this.formGroup.value.thirdInstallment - this.formGroup.value.forthInstallment;

    this.formGroup.patchValue({ remaining: remaining_amount });
    const studentData = this.formGroup.value;
    this.userService.postRequest('_api/student/create', studentData, true).subscribe(
      res => {
        this.userService.handleSuccess("Student created successfully!");
        this.gotoStateContent()
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
  gotoStateContent(){
    this.userService.gotoPage('/state/content/'+this.stateId);
  }
}
