import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [AuthenticationGuard, { provide: Router, useValue: mockRouter }],
    });

    authenticationGuard = TestBed.inject(AuthenticationGuard);
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  it('should return true if user is authenticated', () => {
    expect(authenticationGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toBe(true);
  });

  it('should return false and redirect to login if user is not authenticated', () => {
    // Act
    const result = authenticationGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { redirect: undefined },
      replaceUrl: true,
    });
    expect(result).toBe(false);
  });

  it('should save url as queryParam if user is not authenticated', () => {
    mockRouter.url = '/about';
    mockSnapshot.url = '/about';

    authenticationGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { redirect: mockRouter.url },
      replaceUrl: true,
    });
  });
});
