import { UserService } from '../../service/user.service';

import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
  role= 0;
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
    'governorate',
    'institute',
    'phone',
    'poster',
    'code',
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
    this.role= this.userService.getToken().userInfo.role;
    this.stateId= parseInt(this.actRoute.snapshot.params.stateId);
    this.userService.postRequest('_api/students/getStudentsByRole', {role: this.role}, true).subscribe(
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
    if (this.reportFilterData.minDate+"-0-0") {
      minDate = this.reportFilterData.minDate;
    }
    if (this.reportFilterData.maxDate+ "24-59") {
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
  public download():void {
    let data = document.getElementById('pdfData');
    
    html2canvas(data, {
        scrollX: 130,
        scrollY: -10
      }).then(canvas => {
        
      const contentDataURL = canvas.toDataURL('image/png', 1.0)  
      // var imgWidth = 200; 
      // var pageHeight = 295;
      var imgWidth = canvas.width; 
      var pageHeight = canvas.height;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
    
      var doc = new jsPDF('l', 'mm', 'a4');
      var position = 5;
    
      doc.addImage(contentDataURL, 'PNG', 3, position, Math.floor(imgWidth * 0.2326), Math.floor(pageHeight * 0.2326));
    
      heightLeft -= pageHeight;
    
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');

    });     
  }
  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printEl').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          .mat-row .mat-cell {
              cursor: pointer;
              padding-right: 10px;
              margin-right:20px;
            }
            tr:hover {
              background: #efefef;
            }
            
            .mat-form-field {
              font-size: 14px;
              width: 100%;
            
            }
            
            
            
            .mat-table-sticky-border-elem-right {
              border-left: 1px solid #e0e0e0;
            }
            
            .mat-table-sticky-border-elem-left {
              border-right: 1px solid #e0e0e0;
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}