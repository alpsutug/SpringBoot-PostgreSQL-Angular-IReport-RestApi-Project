import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './modules/auth/services/auth.service';
import {UsersComponent} from './pages/users/users.component';
import {RolesComponent} from './pages/roles/roles.component';
import {JwtInterceptor} from "./modules/auth/jwt.interceptor";
import {RoleDetailComponent} from './pages/roles/role-detail/role-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDetailComponent} from './pages/users/user-detail/user-detail.component';
import {ErrorInterceptor} from "./modules/auth/error.interceptor";
import {NgSelectModule} from "@ng-select/ng-select";
import {BooksComponent} from './pages/books/books.component';
import {BookDetailComponent} from './pages/books/book-detail/book-detail.component';
import {BookListComponent} from './pages/book-list/book-list.component';
import {StudentsComponent} from './pages/students/students.component';
import {StudentDetailComponent} from './pages/students/student-detail/student-detail.component';
import {StudentListComponent} from './pages/student-list/student-list.component';
import {QRCodeModule} from "angularx-qrcode";
import { MakinalarComponent } from './pages/makinalar/makinalar.component';
import { MakinaDetayComponent } from './pages/makinalar/makina-detay/makina-detay.component';
import { MusterilerComponent } from './pages/musteriler/musteriler.component';
import { MusteriDetayComponent } from './pages/musteriler/musteri-detay/musteri-detay.component';
import { BakimplanDetayComponent } from './pages/bakimplan/bakimplan-detay/bakimplan-detay.component';
import { BakimplanComponent } from './pages/bakimplan/bakimplan.component';
import { AyarlarComponent } from './pages/ayarlar/ayarlar.component';
import { AyarlarDetayComponent } from './pages/ayarlar/ayarlar-detay/ayarlar-detay.component';





function appInitializer(authService: AuthService) {
  return () => {
    return "ok";
    // return new Promise((resolve) => {
    //   //@ts-ignore
    //   authService.getUserByToken().subscribe().add(resolve);
    // });
  };
}

@NgModule({
  declarations: [AppComponent, UsersComponent, RolesComponent, RoleDetailComponent, UserDetailComponent,
    BooksComponent, BookDetailComponent, BookListComponent, StudentsComponent, StudentDetailComponent,
    StudentListComponent,
    MakinalarComponent,

    MakinaDetayComponent,
      MusterilerComponent,
      MusteriDetayComponent,
      BakimplanDetayComponent,
      BakimplanComponent,
      AyarlarComponent,
      AyarlarDetayComponent,


   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgSelectModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
