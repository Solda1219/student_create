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
  editedStateId = 0;
  deletedStateId = 0;
  user= {};
  role= [];
  isSuper;
  formGroup: FormGroup;
  formEditGroup: FormGroup;
  @ViewChild('stateCreateModal') public stateCreateModal: ModalDirective;
  @ViewChild('stateEditModal') public stateEditModal: ModalDirective;
  @ViewChild('stateDelModal') public stateDelModal: ModalDirective;
  loading;
  message = '';
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
  ) {}

  ngOnInit(): void {
    // generate random values for mainChart
    this.role= JSON.parse(this.userService.getToken().userInfo.role);
    if(this.role.includes(-1)){
      this.isSuper= true;
    }
    else{
      this.isSuper= false
    }

    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      governorate: ['', Validators.required],
    });

    this.formEditGroup = this._formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      governorate: ['', Validators.required],
    });
    this.userService.postRequest('_api/state/getStatesByRole',{role: this.role}, true).subscribe(
      res => {
        console.log(res['result'])
        let states = res['result'];
        this.states = states;
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
            this.states = states;
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
  stateEdit(state) {
    this.editedStateId = state.id;
    this.formEditGroup.setValue({ id: state.id, name: state.state_name, governorate: state.governorate });
    this.stateEditModal.show();
  }
  updateState() {
    if(!this.formEditGroup.valid) {
      this.message = "Username and Password must be valid."
      this.userService.errorMessage("Please input fields correctly.");
      return
    }
    let updatedData = this.formEditGroup.value;
    this.userService.postRequest('_api/state/update', updatedData, true).subscribe(
      res => {
        this.userService.getRequest('_api/state/all', true).subscribe(
          res => {
            console.log(res['result'])
            let states = res['result'];
            this.states = states;
            this.userService.handleSuccess('State updated successfully!');
            this.stateEditModal.hide()
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
  stateDeleteConfirm(stateId) {
    this.deletedStateId = stateId;
    this.stateDelModal.show();
  }
  deleteState() {
    this.userService.getRequest('_api/state/delete/'+this.deletedStateId, true).subscribe(
      res => {
        this.userService.getRequest('_api/state/all', true).subscribe(
          res => {
            console.log(res['result'])
            let states = res['result'];
            this.states = states;
            this.userService.handleSuccess('State deleted successfully!');
            this.stateDelModal.hide()
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
