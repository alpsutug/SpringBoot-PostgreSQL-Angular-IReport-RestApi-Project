import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-makina-detay',
  templateUrl: './makina-detay.component.html',
  styleUrls: ['./makina-detay.component.scss']
})
export class MakinaDetayComponent implements OnInit {

  public active = false;
  public fullscreen = false;
  public modalForm: FormGroup;


  constructor( private http: HttpClient,private fb: FormBuilder) { }


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

  ngOnInit(): void {
    //id1 ürünadi .... console dan aldım
    this.modalForm = this.fb.group(
      {
        id: [],
        makinaAdi: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        makinaAdet : [0],
        makinaFiyat: [0],
        makinaTarih: [""]

      });
  }

  dismiss() {

    this.active=false;
    this.cancel.emit(); //burası çok önemli

  }

  save() {

    const me = this;
    const f: any = this.modalForm;
    let formData = f.value;

    formData.makinaTarih=formData.makinaTarih.toString().replace("T"," ") +":00"; //düzeltmakinatarihi
    this.cancel.emit(formData);
    if (f.controls["id"].value) {
      this.http.put(environment.makinalarApi + "?makinaId=" + f.controls["id"].value,  formData).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.makinalarApi,  formData).subscribe((res: any) => {
        me.dismiss();
      });

  }

  }

  /*
  downloadReport(row:any) {
    // downloadReport fonksiyonunun içeriği
    //let json ={"id" : row.id}
    let json = {"id": this.modalForm.value.id};

    let curl = environment.makinalarApi + "?";
    curl += "reportNames=reportGroup";
    curl += "&json=" + encodeURIComponent(JSON.stringify(json));
    curl += "&fileType=pdf";

    this.http.get(curl, { responseType: 'blob', observe: 'response' }).subscribe((response: any) => {
      let url = window.URL.createObjectURL(response.body);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "thereport";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

   */


}
