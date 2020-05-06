import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { AuthStateModel } from './state/auth.state';

export class MockAuthenticationService {
  login(context: LoginContext): Observable<AuthStateModel> {
    return of({
      username: context.username,
      token: '123456',
    });
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
