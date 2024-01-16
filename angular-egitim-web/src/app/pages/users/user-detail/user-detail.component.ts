import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public active = false;
  public fullscreen = false;
  public title = '';
  public modalForm: FormGroup;
  public appRoles: Array<any> = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.modalForm = this.fb.group(
      {
        id: [],
        username: ['',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        app_role_id:[],
        email: ['',
          [Validators.required, Validators.email],
        ],
        password: ['',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        first_name: ['',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        last_name: ['',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ]
      });
    this.http.get<any>(environment.rolesApi).subscribe(response => {
      this.appRoles = response.data;
    });
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input()
  public set model(obj: any) {
    this.active = obj !== undefined;
    if (this.active) {
      this.modalForm.reset(obj);
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
    formData.role = 1;
    if (f.controls["id"].value) {
      this.http.put(environment.usersApi + "/" + f.controls["id"].value, formData).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.usersApi, formData).subscribe((res: any) => {
        me.dismiss();
      });
    }
  }
}
