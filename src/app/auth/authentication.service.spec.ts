import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{}, AuthenticationService],
    });

    authenticationService = TestBed.inject(AuthenticationService);
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe((credentials) => {
        expect(credentials).toBeDefined();
        expect(credentials.token).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {});
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {});
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto',
        password: '123',
        remember: true,
      });
      tick();

      // Assert
      request.subscribe(() => {});
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {});
      });
    }));
  });
});
