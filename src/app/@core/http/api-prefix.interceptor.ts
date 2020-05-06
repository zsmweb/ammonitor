import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';
import { environment } from '@env/environment';
import { AuthState } from '@app/auth/state/auth.state';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot<string>(AuthState.token);
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
