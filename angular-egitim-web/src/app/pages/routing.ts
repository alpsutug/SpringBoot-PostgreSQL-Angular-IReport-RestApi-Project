import {Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {RolesComponent} from "./roles/roles.component";
import {BooksComponent} from "./books/books.component";
import {BookListComponent} from "./book-list/book-list.component";
import {StudentsComponent} from "./students/students.component";
import {StudentListComponent} from "./student-list/student-list.component";
import {AuthGuard} from "../modules/auth/services/auth.guard";
import {MakinalarComponent} from "./makinalar/makinalar.component";
import {MusterilerComponent} from "./musteriler/musteriler.component";
import {BakimplanComponent} from "./bakimplan/bakimplan.component";


let studentscomponent;
let Routing: Routes;
Routing = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    component: RolesComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
  },
  {
    path: 'books',
    canActivate: [AuthGuard],
    component: BooksComponent
  },
  {
    path: 'book-list',
    canActivate: [AuthGuard],
    component: BookListComponent
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    component: StudentsComponent
  },
  {
    path: 'student-list',
    canActivate: [AuthGuard],
    component: StudentListComponent
  },
  {
    path: 'machines',
    //canActivate: [AuthGuard],
    component: MakinalarComponent
  },
  {
    path: 'musteriler',
    //canActivate: [AuthGuard],
    component: MusterilerComponent
  },
  {
    path: 'bakimplan',
    //canActivate: [AuthGuard],
    component: BakimplanComponent
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export {Routing};
