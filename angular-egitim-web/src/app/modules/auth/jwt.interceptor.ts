import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';


import {catchError, finalize} from "rxjs/operators";
import {AuthService} from "./services/auth.service";

//import Swal from "sweetalert2";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) {
  }

  // showHideWaitMessage(value: any) {
  //     if (value) {
  //         Swal.fire({
  //             title: '',
  //             html: 'Please wait',
  //             timer: 15000,
  //             timerProgressBar: false,
  //             didOpen: () => {
  //                 Swal.showLoading();
  //             },
  //             willClose: () => {
  //             },
  //         }).then((result) => {
  //             /* Read more about handling dismissals below */
  //             if (result.dismiss === Swal.DismissReason.timer) {
  //             }
  //         });
  //     } else {
  //         Swal.close();
  //     }
  // }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (request.url.indexOf('wmh=true') === -1 && request.url.indexOf('genomicsengland') === -1) {
    //     this.showHideWaitMessage(true);
    // }
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      finalize(() => {
        // if (request.url.indexOf('wmh=true') === -1 && request.url.indexOf('genomicsengland') === -1) {
        //     this.showHideWaitMessage(false);
        // }
      })
    );
  }
}
