import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-musteri-detay',
  templateUrl: './musteri-detay.component.html',
  styleUrls: ['./musteri-detay.component.scss']
})
export class MusteriDetayComponent implements OnInit {

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
        musteriAd: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        musteriSoyad : [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        musteriKayitTarihi: [""],
        musteriTelefonNo: [""]

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


    formData.musteriKayitTarihi=formData.musteriKayitTarihi.toString().replace("T"," ") +":00"; //düzeltmakinatarihi
    this.cancel.emit(formData);
    if (f.controls["id"].value) {
      this.http.put(environment.musterilerApi + "?musteriId=" + f.controls["id"].value,  formData).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.musterilerApi,  formData).subscribe((res: any) => {
        me.dismiss();
      });

    }

  }
}
