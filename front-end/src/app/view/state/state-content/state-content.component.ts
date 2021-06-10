import { UserService } from '../../../service/user.service';

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-state-content',
  styleUrls: ['state-content.component.scss'],
  templateUrl: 'state-content.component.html',
})
export class StateContentComponent implements AfterViewInit, OnInit {
  stateId = 0;
  loading = true;
  displayedColumns: string[] = [
    'name',
    'school',
    'branch',
    'governorate',
    'institute',
    'phone',
    'poster',
    'code',
    'identification',
    'total_amount',
    'first_installment',
    'second_installment',
    'third_installment',
    'forth_installment',
    'remain_amount',
    'notes',
    'action'];
  dataSource: MatTableDataSource<any>;
  students = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private actRoute: ActivatedRoute) {
    // Create 100 users
    this.dataSource = new MatTableDataSource([]);
    
  }
  ngOnInit(): void{
    this.stateId= parseInt(this.actRoute.snapshot.params.stateId);
    this.userService.getRequest('_api/students/get/'+this.stateId, true).subscribe(
      res => {
        this.loading = false;
        this.dataSource.data = res['result'];
        console.log(res['result']);
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

  navigateCreate() {
    this.userService.gotoPage('state/student/create/'+ this.stateId);
  }
  edit(studentId) {
    this.userService.gotoPage('state/student/edit/' + studentId);
  }
  deleteStudent(studentId) {
    this.userService.getRequest('_api/student/delete/' + studentId, true).subscribe(
      res => {
        this.loading = false;
        this.userService.handleSuccess('Student deleted successfully!');
        this.userService.getRequest('_api/students/get/'+this.stateId, true).subscribe(
          res => {
            this.loading = false;
            this.dataSource.data = res['result'];
            console.log(res['result']);
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
}


