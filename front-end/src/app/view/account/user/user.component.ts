import { Component, OnInit, Input,Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { UserService } from '../../../service/user.service';
//import for table widget and modals
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading;
  item = [];
  tbHeader = ['Name', 'Email'];
  tbCol = ['name','email'];
  displayedColumns: string[] = ['No','name','email','Action'];
  specialCol = ['permission']
  tableList: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  formGroup: FormGroup;
  formSetting = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() selectedItems = new EventEmitter();
  @ViewChild('createModal') public createModal: ModalDirective;
  @ViewChild('warningModal') public warningModal: ModalDirective;
  willdelete;
  constructor(
    public cf: CommonFunctionService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
  ) { 
  }
  async ngOnInit() {
    this.formSet()
    await this.search()
  }
  async search() {
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/getUser').toPromise()
      this.item = res['result'];
      this.setTableList();
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  showCreateModal(){
    this.formSet();
    this.createModal.show();
  }
  showEditModal(item){
    this.formSet(item);
    this.createModal.show();
  }
  checkForm(){
    if(!this.formGroup.valid){
      this.userService.errorMessage('Please input items correctly');
      return false
    }else return true;
  }
  formSet(item=null) {
    if(item==null){
      this.formGroup = this._formBuilder.group({
        id: [''],
        name: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      });
      this.formSetting = [//0-hidden,1-enabled,2-disabled,3-readonly
        {label:'',name:'id',placeText:'', required:true,status:0,error:'This field is required.'},
        {label:'Name',name:'name',placeText:'User name',required:true,status:1,error:'This field is required.'},
        {label:'Email',name:'email',placeText:'Email',required:true,status:1,error:'Please input valid email.'},
        {label:'Password',name:'password',placeText:'Password',required:true,status:1,error:'This field is required.'},
      ];
    }else{
      this.formGroup = this._formBuilder.group({
        id: [item.id],
        name: [item.name,Validators.required],
        email: [item.email,[Validators.required,Validators.email]],
        password:[item.password,Validators.required]
      });
      this.formSetting = [//0-hidden,1-enabled,2-disabled,3-readonly
        {label:'',name:'id',placeText:'', required:true,status:0, error:''},
        {label:'Name',name:'name',placeText:'User name',required:true,status:1,error:'This field is required.'},
        {label:'Email',name:'email',placeText:'Email',required:true,status:1, error:'This field is required.'},
        {label:'Password',name:'password',placeText:'Password',required:true,status:0,error:'This field is required.'},
      ];
    }
  }
  async create(){
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/createUser',this.formGroup.value).toPromise()
      this.userService.handleSuccess(res['message']);
      await this.search()
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  async edit(){
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/editUser',this.formGroup.value).toPromise()
      this.userService.handleSuccess(res['message']);
      await this.search()
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  async del(){
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/delUser',this.willdelete).toPromise()
      this.userService.handleSuccess(res['message']);
      await this.search()
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  async status(item){
    item.status = item.status==1?0:1;
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/editUser',item).toPromise()
      this.userService.handleSuccess(res['message']);
    } catch (err) {
      item.status = item.status==1?0:1;
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  async resetPassword(item){
    this.loading = true;
    try {
      const res = await this.userService.postRequest('_api/account/user/resetPasswordUser',item).toPromise()
      this.userService.handleSuccess(res['message']);
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  //table
  setTableList() {
    this.tableList = new MatTableDataSource(this.item)
    this.tableList.paginator = this.paginator;
    this.tableList.sort = this.sort;
  }
  //mat-table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableList.filter = filterValue.trim().toLowerCase();

    if (this.tableList.paginator) {
      this.tableList.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  onSelectionChange(){
    const selected = this.tableList.data.filter(t=>this.selection.isSelected(t))
    this.selectedItems.emit(selected)
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableList.data.forEach(row => this.selection.select(row));
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}


