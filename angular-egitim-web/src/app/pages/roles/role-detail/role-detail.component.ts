import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {

  public active = false;
  public fullscreen = false;
  public title = '';
  public modalForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modalForm = this.fb.group(
      {
        id: [],
        value: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
      });
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input()
  public set model(obj: any) {
    this.active = obj !== undefined;
    if (this.active) {
      // try {
      //   this.modalForm.reset(obj);
      // } catch (e) {
      //
      // }
    }
  }

  @Input()
  public set modalTitle(title: any) {
    this.title = title;
  }

  dismiss() {
    this.active = false;
    this.cancel.emit();
  }

  save() {
    const me = this;
    const f: any = this.modalForm;
    let formData = f.value;
    if (f.controls["id"].value) {
      this.http.put(environment.rolesApi + "/" + f.controls["id"].value, {"data": formData}).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.rolesApi, {"data": formData}).subscribe((res: any) => {
        me.dismiss();
      });
    }
  }
}
