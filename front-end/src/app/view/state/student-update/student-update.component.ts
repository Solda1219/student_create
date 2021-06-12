import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./group-organize.component.scss']
})
export class StudentUpdateComponent implements OnInit {
  studentId = 0;
  loading;
  studentData = {};
  moneyValid = true;
  formGroup: FormGroup;
  constructor(
    public cf: CommonFunctionService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.studentId = parseInt(this.actRoute.snapshot.params.studentId);
    this.userService.getRequest('_api/student/' + this.studentId, true).subscribe(
      res => {
        this.studentData = res['result'];
        this.formGroup = this._formBuilder.group({
          id: [this.studentData['id'], Validators.required],
          stateId: [this.studentData['state_id'], Validators.required],
          name: [this.studentData['name'], Validators.required],
          school: [this.studentData['school'], Validators.required],
          branch: [this.studentData['branch'], Validators.required],
          governorate: [this.studentData['governorate'], Validators.required],
          institute: [this.studentData['institute']],
          phone: [this.studentData['phone']],
          poster: [this.studentData['poster']],
          code: [this.studentData['code']],
          confirmCode: [this.studentData['code']],
          identification: [this.studentData['identification']],
          notes: [this.studentData['notes']],
          firstInstallment: [this.studentData['first_installment']],
          secondInstallment: [this.studentData['second_installment']],
          thirdInstallment: [this.studentData['third_installment']],
          forthInstallment: [this.studentData['forth_installment']],
          remaining: [this.studentData['remain_amount']],
          totalAmount: [this.studentData['total_amount']]
        });
        
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
    this.formGroup = this._formBuilder.group({
      id: [this.studentData['id'], Validators.required],
      stateId: [this.studentData['state_id'], Validators.required],
      name: [this.studentData['name'], Validators.required],
      school: [this.studentData['school'], Validators.required],
      branch: [this.studentData['branch'], Validators.required],
      governorate: [this.studentData['governorate'], Validators.required],
      institute: [this.studentData['institute']],
      phone: [this.studentData['phone']],
      poster: [this.studentData['poster']],
      code: [this.studentData['code']],
      confirmCode: [this.studentData['code']],
      identification: [this.studentData['identification']],
      notes: [this.studentData['notes']],
      firstInstallment: [this.studentData['first_installment']],
      secondInstallment: [this.studentData['second_installment']],
      thirdInstallment: [this.studentData['third_installment']],
      forthInstallment: [this.studentData['forth_installment']],
      remaining: [this.studentData['remain_amount']],
      totalAmount: [this.studentData['total_amount']]
    });
    
    this.loading = true;
  }
  update() {
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
    console.log(remaining_amount);
    this.formGroup.patchValue({ remaining: remaining_amount });

    const studentData= this.formGroup.value;
    this.userService.postRequest('_api/student/update', studentData, true).subscribe(
      res => {
        this.userService.handleSuccess("Student updated successfully!");
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
    this.userService.gotoPage('/state/content/'+this.studentData['state_id']);
  }
}
