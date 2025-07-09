/* import { TestBed } from '@angular/core/testing';
import {
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpEvent
} from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor (class-based)', () => {
  let interceptor: JwtInterceptor;
  let authService: jasmine.SpyObj<AuthService>;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    // create a spy for AuthService
    authService = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
      ]
    });

    // retrieve the interceptor instance from DI
    interceptor = TestBed.inject(JwtInterceptor);
    // A dummy handler that just returns an observable
    httpHandler = {
      handle: (req: HttpRequest<any>) => of({} as HttpEvent<any>)
    };
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', (done) => {
    authService.getToken.and.returnValue('ABC123');
    const req = new HttpRequest('GET', '/test');
    interceptor.intercept(req, httpHandler).subscribe(() => {
      // In httpHandler.handle, no real headers are checked,
      // but we can test that interceptor.clone was used by wrapping handle:
      const modifiedReq = (httpHandler as any).lastRequest as HttpRequest<any>;
      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer ABC123');
      done();
    });
  });

  it('should not add Authorization header when no token', (done) => {
    authService.getToken.and.returnValue(null);
    const req = new HttpRequest('GET', '/test');
    interceptor.intercept(req, httpHandler).subscribe(() => {
      const modifiedReq = (httpHandler as any).lastRequest as HttpRequest<any>;
      // If your dummy handler just returns, we can monkey-patch handle:
      expect(modifiedReq.headers.has('Authorization')).toBeFalse();
      done();
    });
  });
});
 */