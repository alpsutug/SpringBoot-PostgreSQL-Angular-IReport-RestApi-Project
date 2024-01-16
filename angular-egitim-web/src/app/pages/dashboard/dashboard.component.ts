import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";
import {getCSSVariableValue} from "../../_metronic/kt/_utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public booksdata: Array<any> = [];
  public studentsdata: Array<any> = [];
  public transactionsdata: Array<any> = [];


  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private translate: TranslateService) {

  }

  ngOnInit(): void {

    this.fetchData();
  }

  fetchData() {
    this.http.get<any>(environment.dashboardApi).subscribe(response => {
      this.booksdata = response.booksdata;
      this.studentsdata = response.studentsdata;
      this.transactionsdata = response.transactionsdata;
      this.cd.detectChanges();
    });
  }

}
