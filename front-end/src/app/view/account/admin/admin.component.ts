import { UserService } from '../../../service/user.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'admin-content',
  styleUrls: ['admin.component.scss'],
  templateUrl: 'admin.component.html',
  
})
export class AdminComponent implements AfterViewInit, OnInit {
  adminId = 0;
  loading = true;
  studentId = 0;
  editedAdminId = 0;
  deletedAdminId = 0;
  roles= [{'id': -1 , 'state_name': 'Super Admin'}];
  formGroup: FormGroup;
  formEditGroup: FormGroup;
  @ViewChild('adminDelModal') public adminDelModal: ModalDirective;
  @ViewChild('adminCreateModal') public adminCreateModal: ModalDirective;
  @ViewChild('adminEditModal') public adminEditModal: ModalDirective;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'action'
  ];
  dataSource: MatTableDataSource<any>;
  students = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private actRoute: ActivatedRoute, private _formBuilder: FormBuilder,) {
    // Create 100 users
    this.dataSource = new MatTableDataSource([]);
    
  }
  ngOnInit(): void{
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: [[], Validators.required],
      password: ['', Validators.required]
    });

    this.formEditGroup = this._formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: [[], Validators.required],
      password: ['']
    });
    this.userService.getRequest('_api/state/all', true).subscribe(
      res => {
        this.roles= this.roles.concat(res['result']);
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )
    this.userService.getRequest('_api/account/admin/getAdmins', true).subscribe(
      res => {
        this.loading = false;
        this.dataSource.data = res['result'];;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createAdmin() {
    if(!this.formGroup.valid){
      this.userService.errorMessage("Please input all required field!");
      return;
    }
    let data = this.formGroup.value;

    this.userService.postRequest('_api/account/admin/create', data, true).subscribe(
      res => {
        this.userService.getRequest('_api/account/admin/getAdmins', true).subscribe(
          res => {
            this.loading = false;
            this.dataSource.data = res['result'];
            this.userService.handleSuccess("Admin created successfully!");
            this.adminCreateModal.hide();
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        );
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
  edit(admin) {
    this.editedAdminId = admin.id;
    this.formEditGroup.patchValue({id: this.editedAdminId, name: admin.name, email: admin.email, role: JSON.parse(admin.role), role_name: admin.role_name })
    this.adminEditModal.show();
  }
  showDelModal(adminId) {
    this.deletedAdminId = adminId;
    this.adminDelModal.show();
  }
  deleteAdmin() {
    this.userService.getRequest('_api/account/admin/delete/' + this.deletedAdminId, true).subscribe(
      res => {
        this.userService.getRequest('_api/account/admin/getAdmins', true).subscribe(
          res => {
            this.loading = false;
            this.dataSource.data = res['result'];
            this.userService.handleSuccess("Admin deleted successfully!");
            this.adminDelModal.hide();
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        );
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
  }
  updateAdmin() {
    if(!this.formEditGroup.valid){
      this.userService.errorMessage("Please input all required field!");
      return;
    }
    let data = this.formEditGroup.value;
    this.userService.postRequest('_api/account/admin/update', data, true).subscribe(
      res => {
        this.userService.getRequest('_api/account/admin/getAdmins', true).subscribe(
          res => {
            this.loading = false;
            this.dataSource.data = res['result'];
            this.userService.handleSuccess("Admin updated successfully!");
            this.adminEditModal.hide();
          },
          err => {
            console.log(err)
            this.loading = false;
            this.userService.handleError(err)
          }
        );
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
}


