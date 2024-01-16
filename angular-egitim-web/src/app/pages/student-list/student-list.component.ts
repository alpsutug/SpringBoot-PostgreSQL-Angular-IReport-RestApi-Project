import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  public data: Array<any> = [];
  public row: any;
  public selectedRow: any;
  public searchStudents: string = '';
  public detailRow: any;
  public modalTitle: any = '';
  public pagging = {
    total: 0,
    page: 1,
    offset: 0,
    size: 5
  };
  public pageTitle = 'STUDENTS.TITLE';
  public deleteMsgTitle = 'CONFIRM.DELETEMSGTITLE';
  public deleteText = 'CONFIRM.DELETETEXT';
  public confirmButtonText = 'CONFIRM.CONFIRMBUTTONTEXT';
  public cancelButtonText = 'CONFIRM.CANCELBUTTONTEXT';

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private translate: TranslateService) {
    this.translate.get(this.pageTitle).subscribe((lbl)=>{
      this.pageTitle = lbl;
    });
    this.translate.get(this.deleteMsgTitle).subscribe((lbl)=>{
      this.deleteMsgTitle = lbl;
    });
    this.translate.get(this.deleteText).subscribe((lbl)=>{
      this.deleteText = lbl;
    });
    this.translate.get(this.confirmButtonText).subscribe((lbl)=>{
      this.confirmButtonText = lbl;
    });
    this.translate.get(this.cancelButtonText).subscribe((lbl)=>{
      this.cancelButtonText = lbl;
    });
  }

  ngOnInit(): void {
    this.fetchData();
    //this.addData();
  }

  fetchData() {
    this.data = [];
    this.http.get<any>(this.setUrlOptions(environment.studentsApi)).subscribe(response => {
      this.data = response.data;
      this.pagging.total = response.meta.pagination.total;
      this.cd.detectChanges();
    });
  }

  setUrlOptions(pageApi: string) {
    let curl = pageApi;
    curl += "?sort=id:ASC";
    curl += "&pagination%5Bstart%5D=" + this.pagging.offset;
    curl += "&pagination%5Blimit%5D=" + this.pagging.size;
    let filters = '';
    if (this.searchStudents.length === 0 || this.searchStudents.length > 2) {
      filters += '&filters[$or][0][identification_number][$containsi]=' + this.searchStudents;
      filters += '&filters[$or][1][student_number][$containsi]=' + this.searchStudents;
      filters += '&filters[$or][2][phone_number][$containsi]=' + this.searchStudents;
      filters += '&filters[$or][3][first_name][$containsi]=' + this.searchStudents;
      filters += '&filters[$or][4][last_name][$containsi]=' + this.searchStudents;
    }
    return curl + filters;
  }

  openRow(row: any) {
    if (this.selectedRow && this.selectedRow == row) {
      this.selectedRow = undefined;
    } else {
      this.selectedRow = row;
    }
  }

  setPage(page: number) {
    this.pagging.offset = (this.pagging.size * (page - 1));
    this.fetchData();
  }

  addData() {
    this.translate.get('STUDENTS.ADD').subscribe((lbl)=>{
      this.modalTitle = lbl;
    });
    this.detailRow = {active:true};
  }

  editData(row: any) {
    this.translate.get('STUDENTS.EDIT').subscribe((lbl) => {
      this.modalTitle = lbl;
    });
    this.detailRow = row;
  }

  async deleteData(row: any) {
    this.selectedRow = row;
    Swal.fire({
      title: this.deleteMsgTitle,
      text:  this.deleteText,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: this.confirmButtonText,
      cancelButtonText: this.cancelButtonText
    }).then(result => {
      if (result.value) {
        this.http.delete(environment.studentsApi + "/" + row.id).subscribe((res: any) => {
          this.fetchData();
        });
      }
    });
  }


  cancelDetail(e: any) {
    this.fetchData();
  }

  searchStudent() {
    if (this.searchStudents.length === 0 || this.searchStudents.length > 2) {
      this.fetchData();
    }
  }
}

