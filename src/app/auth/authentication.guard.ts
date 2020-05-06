import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { Store } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { Navigate } from '@ngxs/router-plugin';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.store.dispatch(new Navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true }));
    return false;
  }
}
