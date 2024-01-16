import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {


  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): any {
    return this.getAuthFromLocalStorage();
  }

  set currentUserValue(user: UserType) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  // public methods
  /*login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }*/

  login(email: string, password: string) {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(environment.authApi+"?userName="+email+"&password="+password).pipe(map(res => {
      if (res && res.token) {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('ACCESS_TOKEN', res.token);
        //this.http.post(environment.sessionApi, {"is_logout": false}).subscribe();
        this.currentUserSubject.next(res.user);
      }
      return res.user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ACCESS_TOKEN');
    this.currentUserSubject.next(null!);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return of(undefined);
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return of(null);/*this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );*/
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return of(false);/*this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));*/
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem("currentUser");
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    //this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
