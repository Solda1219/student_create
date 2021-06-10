import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';

@Component({
  selector: 'app-state-all',
  templateUrl: 'state.component.html'
})
export class StateComponent implements OnInit {
  states = [];
  formGroup: FormGroup;
  @ViewChild('stateCreateModal') public stateCreateModal: ModalDirective;
  loading;
  message = '';
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
  ) {}

  ngOnInit(): void {
    // generate random values for mainChart
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      governorate: ['', Validators.required],
    });
    
    this.userService.getRequest('_api/state/all', true).subscribe(
      res => {
        console.log(res['result'])
        let states = res['result'];
        this.states = [];
        for (let i = 0; i < states.length; i++){
          let students = JSON.parse(states[i].students);
          let student_count = students.length;
          let state = { ...states[i], student_count };
          this.states.push(state);
        }
        console.log(this.states)
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )
    this.loading = false;
  }
  createState() {
    let stateData = this.formGroup.value;
    if(!this.formGroup.valid) {
      this.message = "Username and Password must be valid."
      this.userService.errorMessage("Please input fields correctly.");
      return
    }
    else {
      this.userService.postRequest('_api/state/create', stateData).subscribe(
      res => {
        this.loading = false;
        this.userService.getRequest('_api/state/all', true).subscribe(
          res => {
            console.log(res['result'])
            let states = res['result'];
            this.states = [];
            for (let i = 0; i < states.length; i++){
              let students = JSON.parse(states[i].students);
              let student_count = students.length;
              let state = { ...states[i], student_count };
              this.states.push(state);
            }
            this.userService.handleSuccess('State created successfully!');
            this.stateCreateModal.hide()
          },
          err => {
            this.loading = false;
            this.userService.handleError(err)
          }
        )
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )
    }
  }
  stateContent(stateId) {
    this.userService.gotoPage('/state/content/' + stateId);
  }
}
