import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  const authHeader = authService.getAuthHeader();

  if (authHeader) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader),
    });
    return next(authReq);
  }
  return next(req);
};

