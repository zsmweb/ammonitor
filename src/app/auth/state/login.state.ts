import { State, Action, StateContext } from '@ngxs/store';
import { SubmitLoginForm } from './login.actions';
import { Login } from './auth.actions';

export class LoginStateModel {
  loginForm: any;
}

@State<LoginStateModel>({
  name: 'login',
  defaults: {
    loginForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
export class LoginState {
  @Action(SubmitLoginForm)
  submit(ctx: StateContext<LoginStateModel>, action: SubmitLoginForm) {
    const state = ctx.getState();
    ctx.dispatch(new Login(state.loginForm.model));
  }
}
