import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public data: Array<any> = [];
  public row: any;
  public selectedRow: any;
  public detailRow: any;
  public modalTitle: any = '';
  public pagging = {
    total: 0,
    page: 1,
    offset: 0,
    size: 5
  };
  public pageTitle = 'ROLES.TITLE';
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
  }

  fetchData() {
    this.data = [];
    this.http.get<any>(this.setUrlOptions(environment.rolesApi)).subscribe(response => {
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
    //const f = this.filterForm.controls;
    let filters = '';
    // if (f["runId"].value) {
    //   filters += '&filters[id][$eq]=' + f["runId"].value;
    // }
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

  addData(row: any) {
    this.translate.get('ROLES.ADD').subscribe((lbl)=>{
      this.modalTitle = lbl;
    });
    this.detailRow = {};
  }

  editData(row: any) {
    this.translate.get('ROLES.EDIT').subscribe((lbl) => {
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
        this.http.delete(environment.rolesApi + "/" + row.id).subscribe((res: any) => {
          this.fetchData();
        });
      }
    });
  }


  cancelDetail(e: any) {
    this.fetchData();
  }
}
