import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  public appRoleId = 0;
  public appRoleObjects: Array<any> = [];

  constructor(private router: Router,private authService: AuthService, private http: HttpClient) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.appRoleId = 1;
      return true;
      //Number(currentUser['app_role_id']);
      /*if (this.appRoleObjects.length === 0) {
        const appRoleObject: any = await this.http.get(environment.appRoleObjectsApi + "?filters[app_role_id][$eq]=" + this.appRoleId).toPromise();
        appRoleObject.data.forEach((row: any) => {
          this.appRoleObjects.push(row.object_name);
        });
      }
      return true;
      const result = (this.appRoleObjects.indexOf(state.url) > -1);
      if (result) {
        return true;
      } else {
        this.router.navigate(['dashboard']);
        return false;
      }*/
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
