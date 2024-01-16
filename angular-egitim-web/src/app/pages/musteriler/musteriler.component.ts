import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: ['./musteriler.component.scss']
})
export class MusterilerComponent implements OnInit {


  public data: Array<any> = [];
  public row: any;
  public selectedRow: any;
  public detailRow: any;
  public searchText: any;
  public startDate: any;
  public endDate: any;



  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.data = [];

    let query = '';
    if (this.searchText?.length > 0) {
      query = '?query=' + this.searchText;
    }

    this.http.get<any>(environment.musterilerApi + query).subscribe(response => {
      this.data = response;
      this.cd.detectChanges();

    });
  }

  addData() {
    this.detailRow = {
      musteriAd: 'Buraya yeni ürün adı girebilirsiniz!!!'

    };

  }



  editData(row: any) {
    this.detailRow = row

  }

  openRow(row: any) {


  }


  async deleteData(row: any) {
    this.selectedRow = row;
    Swal.fire({
      title: "Silme sorusu başlığı buraya",
      text: "Silinsin mi buraya",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: "Ok-->Delete ıt",
      cancelButtonText: "Cansel -> yok silme"
    }).then(result => {
      if (result.value) {
        this.http.delete(environment.remmusterilerApi + "?musteriId=" + row.id).subscribe((res: any) => {
          this.fetchData();
        });
      }
    });
  }


  cancelDetail(e: any) {
    this.fetchData();


  }

  search(e: any) {

    if (this.searchText.length === 0 || this.searchText.length > 2) {
      this.fetchData();
    }


  }

  /*
  downloadReport2(row:any) {
    // downloadReport fonksiyonunun içeriği
    let json ={"id" : row.id}
    //let json = {"id": this.modalForm.value.id};

    let curl = environment.reportsApi + "?";
    curl += "reportName=report6";
    curl += "&json=" + encodeURIComponent(JSON.stringify(json));
    curl += "&fileType=pdf";

    this.http.get(curl, { responseType: 'blob', observe: 'response' }).subscribe((response: any) => {
      let url = window.URL.createObjectURL(response.body);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "musteriTablo";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }



   */

  downloadReport2(row:any) {
    // downloadReport fonksiyonunun içeriği
    let json ={"id" : row.id}
    //let json = {"id": this.modalForm.value.id};

    let curl = environment.reportsApi + "?";
    curl += "reportName=report9";
    curl += "&json=" + encodeURIComponent(JSON.stringify(json));
    curl += "&fileType=pdf";

    this.http.get(curl, { responseType: 'blob', observe: 'response' }).subscribe((response: any) => {
      let url = window.URL.createObjectURL(response.body);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "musteriTablo";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }






}
