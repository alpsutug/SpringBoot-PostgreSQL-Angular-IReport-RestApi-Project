import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-makinalar',
  templateUrl: './makinalar.component.html',
  styleUrls: ['./makinalar.component.scss']
})
export class MakinalarComponent implements OnInit {


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

    this.http.get<any>(environment.makinalarApi + query).subscribe(response => {
      this.data = response;
      this.cd.detectChanges();

    });
  }

  addData() {
    this.detailRow = {
      makinaAdi: 'Buraya yeni ürün adı girebilirsiniz!!!'
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
        this.http.delete(environment.remmakinalarApi + "?makinaId=" + row.id).subscribe((res: any) => {
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
  downloadReport() {
    let json ={"startDate":this.formatDateToCustomFormat(this.startDate), "endDate":this.formatDateToCustomFormat(this.endDate)}
    let curl = environment.reportsApi + "?";// http://localhost:8080/api/reports
    curl += "reportName=report4";
    curl += "&json=" +  encodeURIComponent( JSON.stringify(json));
    curl += "&fileType=pdf";
    this.http.get(curl, {responseType: 'blob', observe: 'response'}).subscribe((response: any)  => {
      let url = window.URL.createObjectURL(response.body);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "makinaTablo";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }
  formatDateToCustomFormat(dateStr: string) {
    const currentDate = new Date(dateStr);
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }


}
