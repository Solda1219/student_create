import { UserService } from '../../service/user.service';

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-report-content',
  styleUrls: ['report.component.scss'],
  templateUrl: 'report.component.html',
})
export class ReportComponent implements AfterViewInit, OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  totalData = [];
  states = [];
  totalSum = 0;
  firstSum = 0;
  secondSum = 0;
  thirdSum = 0;
  forthSum = 0;
  remainSum = 0;
  reportFilterData = {
    minDate: 0,
    maxDate: 100000000000000,
    state: 0,
    minTotal: 0,
    maxTotal: 10000000,
    minRemain: 0,
    maxRemain: 10000000,
  };
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
    'notes'];
  dataSource: MatTableDataSource<any>;
  students = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private actRoute: ActivatedRoute) {
    // Create 100 users
    this.dataSource = new MatTableDataSource([]);
    
  }
  setSum() {
    this.totalSum = 0;
    this.firstSum = 0;
    this.secondSum = 0;
    this.thirdSum = 0;
    this.forthSum = 0;
    this.remainSum = 0;
    for (let i = 0; i < this.dataSource.data.length; i++){
      if (this.dataSource.data[i]['total_amount']) {
        
        this.totalSum = this.totalSum+ parseInt(this.dataSource.data[i]['total_amount']);
      }
      if (this.dataSource.data[i]['first_installment']) {
        console.log("come here?")
        this.firstSum = this.firstSum+ parseInt(this.dataSource.data[i]['first_installment']);
      }
      if (this.dataSource.data[i]['second_installment']) {
        this.secondSum = this.secondSum+ parseInt(this.dataSource.data[i]['second_installment']);
      }
      if (this.dataSource.data[i]['third_installment']) {
        this.thirdSum = this.thirdSum+ parseInt(this.dataSource.data[i]['third_installment']);
      }
      if (this.dataSource.data[i]['forth_installment']) {
        this.forthSum = this.forthSum+ parseInt(this.dataSource.data[i]['forth_installment']);
      }
      if (this.dataSource.data[i]['remain_amount']) {
        this.remainSum = this.remainSum+ parseInt(this.dataSource.data[i]['remain_amount']);
      }
    }
  }
  ngOnInit(): void{
    this.stateId= parseInt(this.actRoute.snapshot.params.stateId);
    this.userService.getRequest('_api/students/getAll', true).subscribe(
      res => {
        this.loading = false;
        this.totalData = res['result'];
        this.dataSource.data = res['result'];
        // sumup
        this.setSum();
        console.log(res['result']);
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    );
    this.userService.getRequest('_api/state/all', true).subscribe(
      res => {
        this.states = res['result'];
      },
      err => {
        this.loading = false;
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  applyFilter() {
    let allData = this.totalData;
    let state = 0;
    let minDate = 0;
    let maxDate = 1000000000000000;
    let minTotal = 0;
    let maxTotal = 1000000;
    let minRemain = 0;
    let maxRemain = 1000000;
    if (this.reportFilterData.minDate) {
      minDate = this.reportFilterData.minDate;
    }
    if (this.reportFilterData.maxDate) {
      maxDate = this.reportFilterData.maxDate;
    }
    if (this.reportFilterData.minTotal) {
      minTotal = this.reportFilterData.minTotal;
    }
    if (this.reportFilterData.maxTotal) {
      maxTotal = this.reportFilterData.maxTotal;
    }
    if (this.reportFilterData.minRemain) {
      minRemain = this.reportFilterData.minRemain;
    }
    if (this.reportFilterData.maxRemain) {
      maxRemain = this.reportFilterData.maxRemain;
    }
    if (this.reportFilterData.state) {
      state = this.reportFilterData.state;
    }
    let filteredData= allData.filter(one => {
      var someDate = new Date(one.created_at);
      var createdAt = someDate.getTime();
      if ((state==0||state == one.state_id) && (minDate <= createdAt && createdAt <= maxDate) && (minTotal <= one.total_amount && one.total_amount <= maxTotal) && (minRemain <= one.remain_amount && one.remain_amount <= maxRemain)) {
        return true;
      }
    });
    this.dataSource.data = filteredData;
    this.setSum();
  }
  dateMin(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = new Date(event.value);
    let epdate = someDate.getTime();
    this.reportFilterData = { ...this.reportFilterData, minDate: epdate };
    this.applyFilter();
  }
  dateMax(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = new Date(event.value);
    let epdate = someDate.getTime();
    this.reportFilterData = { ...this.reportFilterData, maxDate: epdate };
    this.applyFilter();
  }
  stateChange(event) {
    this.reportFilterData = { ...this.reportFilterData, state: parseInt(event.target.value.trim()) };
    this.applyFilter();
  }
  totalMin(event) {
    let minTotal = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, minTotal: minTotal };
    this.applyFilter();
  }
  totalMax(event) {
    let maxTotal = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, maxTotal: maxTotal };
    this.applyFilter();
  }
  remainMin(event) {
    let minRemain = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, minRemain: minRemain };
    this.applyFilter();
  }
  remainMax(event) {
    let maxRemain = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, maxRemain: maxRemain };
    this.applyFilter();
  }
}