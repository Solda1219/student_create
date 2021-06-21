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
  rangeInstallment= new FormGroup({
    startInstallment: new FormControl(),
    endInstallment: new FormControl()
  });
  totalData = [];
  states = [];
  totalSum = 0;
  firstSum = 0;
  secondSum = 0;
  thirdSum = 0;
  forthSum = 0;
  remainSum = 0;
  role= [];
  reportFilterData = {
    minDate: 0,
    maxDate: 100000000000000,
    minInstallmentDate: 0,
    maxInstallmentDate: 100000000000000,
    state: 0,
    minInv: 0,
    maxInv: 10000000,
  };
  stateId = 0;
  loading = true;
  displayedColumns: string[] = [
    'id',
    'name',
    'school',
    'governorate',
    'institute',
    'phone',
    'phone_second',
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
      // if (this.dataSource.data[i]['total_amount']) {
        
      //   this.totalSum = this.totalSum+ parseInt(this.dataSource.data[i]['total_amount']);
      // }
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
    this.totalSum = this.firstSum + this.secondSum + this.thirdSum + this.forthSum;
  }
  ngOnInit(): void{
    this.role= JSON.parse(this.userService.getToken().userInfo.role);
    this.stateId= parseInt(this.actRoute.snapshot.params.stateId);
    this.userService.postRequest('_api/students/getStudentsByRole', {role: this.role}, true).subscribe(
      res => {
        this.loading = false;
        
        this.totalData = res['result'];
        console.log('totalData', this.totalData);
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
    let minInstallmentDate = 0;
    let maxInstallmentDate = 1000000000000000;
    let minInv = 0;
    let maxInv = 1000000;
    if (this.reportFilterData.minDate) {
      minDate = this.reportFilterData.minDate;
    }
    if (this.reportFilterData.maxDate) {
      maxDate = this.reportFilterData.maxDate;
    }
    if (this.reportFilterData.minInstallmentDate) {
      minInstallmentDate = this.reportFilterData.minInstallmentDate;
    }
    if (this.reportFilterData.maxInstallmentDate) {
      maxInstallmentDate = this.reportFilterData.maxInstallmentDate;
    }
    if (this.reportFilterData.minInv) {
      minInv = this.reportFilterData.minInv;
    }
    if (this.reportFilterData.maxInv) {
      maxInv = this.reportFilterData.maxInv;
    }
    if (this.reportFilterData.state) {
      state = this.reportFilterData.state;
    }
    let filteredData= allData.filter(one => {
      var someDate = new Date(this.getTypedDate(one.created_at));
      var createdAt = someDate.getTime();
      console.log("createdAt", createdAt);
      var firstDate= new Date(this.getTypedDate(one.first_ins_date));
      var firstInsDate= firstDate.getTime();
      var secondDate= new Date(this.getTypedDate(one.second_ins_date));
      var secondInsDate= secondDate.getTime();
      var thirdDate= new Date(this.getTypedDate(one.third_ins_date));
      var thirdInsDate= thirdDate.getTime();
      var forthDate= new Date(this.getTypedDate(one.forth_ins_date));
      var forthInsDate= forthDate.getTime();
      if ((state==0||state == one.state_id) && (minDate <= createdAt && createdAt <= maxDate) &&((minInstallmentDate <=firstInsDate&&firstInsDate<= maxInstallmentDate)||(minInstallmentDate <= secondInsDate&& secondInsDate<= maxInstallmentDate)||(minInstallmentDate <= thirdInsDate&& thirdInsDate<= maxInstallmentDate)||(minInstallmentDate <= forthInsDate&& forthInsDate<= maxInstallmentDate)) && ((minInv <= parseInt(one.first_ins_invoice) && parseInt(one.first_ins_invoice) <= maxInv)||(minInv <= parseInt(one.second_ins_invoice) && parseInt(one.second_ins_invoice) <= maxInv)||(minInv <= parseInt(one.third_ins_invoice) && parseInt(one.third_ins_invoice) <= maxInv)||(minInv <= parseInt(one.forth_ins_invoice) && parseInt(one.forth_ins_invoice) <= maxInv)) ) {
        return true;
      }
      // if ((state==0||state == one.state_id) && (minDate <= createdAt && createdAt <= maxDate) && ((minInv <= parseInt(one.first_ins_invoice) && parseInt(one.first_ins_invoice) <= maxInv)||(minInv <= parseInt(one.second_ins_invoice) && parseInt(one.second_ins_invoice) <= maxInv)||(minInv <= parseInt(one.third_ins_invoice) && parseInt(one.third_ins_invoice) <= maxInv)||(minInv <= parseInt(one.forth_ins_invoice) && parseInt(one.forth_ins_invoice) <= maxInv)) ) {
      //   return true;
      // }
    });
    console.log("filteredData", filteredData);
    this.dataSource.data = filteredData;
    this.setSum();
  }
  getTypedDate(dateStr){
    let date_ob = new Date(dateStr);
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    let result = year + "-" + month + "-" + date;
    console.log("result", result);
    return result;

  }
  dateMin(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = this.getTypedDate(event.value);
    let modified= new Date(someDate);

    let epdate = modified.getTime();
    console.log("dateMin", epdate);
    this.reportFilterData = { ...this.reportFilterData, minDate: epdate };
    this.applyFilter();
  }
  dateMax(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = this.getTypedDate(event.value);
    let modified= new Date(someDate);
    let epdate = modified.getTime();
    console.log("max", epdate);
    this.reportFilterData = { ...this.reportFilterData, maxDate: epdate };
    this.applyFilter();
  }
  dateInstallmentMin(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = this.getTypedDate(event.value);
    var modified = new Date(someDate);
    let epdate = modified.getTime();
    this.reportFilterData = { ...this.reportFilterData, minInstallmentDate: epdate };
    this.applyFilter();
  }
  dateInstallmentMax(type: string, event: MatDatepickerInputEvent<Date>) {
    var someDate = this.getTypedDate(event.value);
    var modified = new Date(someDate);
    let epdate = modified.getTime();
    this.reportFilterData = { ...this.reportFilterData, maxInstallmentDate: epdate };
    this.applyFilter();
  }
  stateChange(event) {
    this.reportFilterData = { ...this.reportFilterData, state: parseInt(event.target.value.trim()) };
    this.applyFilter();
  }
  setInvMin(event) {
    let minInv = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, minInv: minInv };
    this.applyFilter();
  }
  setInvMax(event) {
    let maxInv = parseInt(event.target.value.trim());
    this.reportFilterData = { ...this.reportFilterData, maxInv: maxInv };
    this.applyFilter();
  }
  public download():void {
    let data = document.getElementById('printSpe');
    
    html2canvas(data, {
        scrollX: -130,
        // scrollY: 70,
      x: -11,
      scale: 1,
        removeContainer:true
      }).then(canvas => {
        
      const contentDataURL = canvas.toDataURL('image/png')  
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
  // public download():void {
  //   let data = document.getElementById('pdfData');
    
  //   html2canvas(data, {
  //       scrollX: -110,
  //       scrollY: -10
  //     }).then(canvas => {
        
  //     const contentDataURL = canvas.toDataURL('image/png', 1.0)  
  //     // var imgWidth = 200; 
  //     // var pageHeight = 295;
  //     var imgWidth = canvas.width; 
  //     var pageHeight = canvas.height;  
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var heightLeft = imgHeight;
    
  //     var doc = new jsPDF('l', 'mm', 'a4');
  //     var position = 5;
    
  //     doc.addImage(contentDataURL, 'PNG', 3, position, Math.floor(imgWidth * 0.2326), Math.floor(pageHeight * 0.2326));
    
  //     heightLeft -= pageHeight;
    
  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       doc.addPage();
  //       doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }
  //     doc.save( 'file.pdf');

  //   });     
  // }
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