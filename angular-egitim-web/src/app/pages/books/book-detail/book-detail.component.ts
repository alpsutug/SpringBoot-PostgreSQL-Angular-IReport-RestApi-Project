import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  public active = false;
  public fullscreen = false;
  public title = '';
  public modalForm: FormGroup;

  public isStartReader:boolean=false;
  private cronInterval: any;
  public readerId: number = 1; //1. istasyon  olarak değiştirilecek

  constructor(private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.modalForm = this.fb.group(
      {
        id: [],
        epc_code: ['', Validators.compose([
          Validators.required,
          Validators.minLength(24),
          Validators.maxLength(30)
        ])],
        author_name: [''],
        title_of_work: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])],
        isbn_no: [''],
        lc: [''],
        language: [''],
        place_and_year: [''],
        vol: [''],
        subject: [''],
        number_of_pages: [''],
        explanation: ['']
      });
  }


  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input()
  public set model(obj: any) {
    this.active = obj !== undefined;
    if (this.active) {
      try {
        this.modalForm.reset(obj);
      } catch (e) {

      }
    }
  }

  @Input()
  public set modalTitle(title: any) {
    this.title = title;
  }

  dismiss() {
    this.isStartReader = false;
    clearInterval(this.cronInterval);
    this.active = false;
    this.cancel.emit();
  }

  save() {
    this.isStartReader = false;
    clearInterval(this.cronInterval);
    const me = this;
    const f: any = this.modalForm;
    let formData = f.value;
    if (f.controls["id"].value) {
      this.http.put(environment.booksApi + "/" + f.controls["id"].value, {"data": formData}).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.booksApi, {"data": formData}).subscribe((res: any) => {
        if (res.success) {
          me.dismiss();
        } else {
          Swal.fire({
            icon: 'warning',
            title: '',
            html: '<h5>' + res.message ? res.message : JSON.stringify(res) + '</h5>',
            timer: 5000,
            timerProgressBar: false
          });
        }
      });
    }
  }

  startReader() {
    clearInterval(this.cronInterval);
    this.isStartReader = true;
    this.cronInterval = setInterval(() => {
      this.runCronTask();
    }, 1000);
  }

  runCronTask() {
    const me = this;
    let curl = environment.epcReadingsApi;
    curl += "?sort=updatedAt:DESC";
    curl += "&filters[reader_id][$eq]=" + this.readerId;
    curl += "&filters[used][$eq]=false";
    //const besDakikaOnce = new Date(new Date().getTime() - 5 * 60 * 1000);
    //const birDakikaOnce = new Date(new Date().getTime() - 60 * 1000);
    const onSnOnce = new Date(new Date().getTime() - 10 * 1000);
    curl += "&filters[createdAt][$gte]=" + onSnOnce.toISOString();
    this.http.get<any>(curl).subscribe(response => {
      const f: any = this.modalForm;

      if (response.data.length == 0){
        const row =  response.data[0];
        f.controls["epc_code"].setValue('');
        this.cd.detectChanges();
        return;
      }

      if (response.data.length == 1){
        this.isStartReader = false;
        clearInterval(this.cronInterval);
        const row =  response.data[0];
        f.controls["epc_code"].setValue(row.epc_code);
        this.getBookFromEpc(row.epc_code);
        this.cd.detectChanges();
        return;
      }

      if (response.data.length > 1){
        this.isStartReader = false;
        clearInterval(this.cronInterval);
        f.controls["epc_code"].setValue();
        this.cd.detectChanges();

        let epcCodes = "";
        response.data.forEach((row:any)=>{
          epcCodes += row.epc_code+"<br>"
        });

        Swal.fire({
          icon: 'warning',
          title: '',
          html: '<h5>' + epcCodes + ' <br>Kodları ile birden fazla kitap okundu!<br> lütfen kontrol ediniz.</h5>',
          timer: 5000,
          timerProgressBar: false
        });

      }

    });
  }


  getBookFromEpc(epcCode : any){
    let filters = '?filters[$or][0][epc_code][$containsi]=' + epcCode;
    this.http.get<any>(environment.booksApi+filters).subscribe(response => {
      if (response.data && response.data.length === 1){
        this.modalForm.reset(response.data[0]);
      }
      if (response.data && response.data.length > 1){
        Swal.fire({
          icon: 'warning',
          title: '',
          html: '<h5>' + epcCode + ' <br>Kodu ile birden fazla kitap tanımlanmış!, lütfen düzeltiniz.</h5>',
          timer: 5000,
          timerProgressBar: false
        });
      }
    });
  }

  reset() {
    this.isStartReader = false;
    clearInterval(this.cronInterval);
    this.modalForm.reset();
  }
}


