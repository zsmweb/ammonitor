import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';

export class AuthStateModel {
  token: string | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static username(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthenticationService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username,
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          username: null,
        });
      })
    );
  }
}
