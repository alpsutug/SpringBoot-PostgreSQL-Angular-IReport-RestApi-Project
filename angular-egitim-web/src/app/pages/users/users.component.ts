import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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


  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.data = [];
    this.http.get<any>(this.setUrlOptions(environment.usersApi)).subscribe(response => {
      this.data = response;
      this.data.forEach((row)=>{
        row['app_role_id'] = Number(row['app_role_id'])
      });
      this.pagging.total = 5;
      this.cd.detectChanges();
    });
  }

  setUrlOptions(runsApi: string) {
    let curl = runsApi;
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
    this.modalTitle = 'Add User';
    this.detailRow = {};
  }

  editData(row: any) {
    this.modalTitle = 'Edit User';
    this.detailRow = row;
  }

  async deleteData(row: any) {
    this.selectedRow = row;
    Swal.fire({
      title: 'Are you sure?',
      text: 'The User will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.http.delete(environment.usersApi + "/" + row.id).subscribe((res: any) => {
          this.fetchData();
        });
      }
    });
  }

  cancelDetail(e: any) {
    this.fetchData();
  }
}
