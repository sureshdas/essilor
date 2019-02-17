import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.credentials ? JSON.parse(sessionStorage.credentials).token || '' : '';
    // console.log('interceptor :', token);
    if (!token) {
      request = request.clone({
        url: environment.serverUrl + request.url,
      });
    } else {
      request = request.clone({
        url: environment.serverUrl + request.url,
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request);
  }

}
