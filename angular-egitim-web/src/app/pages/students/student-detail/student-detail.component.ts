import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  public active = false;
  public fullscreen = false;
  public title = '';
  public modalForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.modalForm = this.fb.group(
      {
        id: [],
        identification_number: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        student_number: [''],
        phone_number: [''],
        email: ['',
          [Validators.required, Validators.email],
        ],
        first_name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        last_name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        active: [true],

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
    this.active = false;
    this.cancel.emit();
  }

  save() {
    const me = this;
    const f: any = this.modalForm;
    let formData = f.value;
    if (f.controls["id"].value) {
      this.http.put(environment.studentsApi + "/" + f.controls["id"].value, {"data": formData}).subscribe((res: any) => {
        me.dismiss();
      });
    } else {
      delete formData.id;
      this.http.post(environment.studentsApi, {"data": formData}).subscribe((res: any) => {
        me.dismiss();
      });
    }
  }
}
