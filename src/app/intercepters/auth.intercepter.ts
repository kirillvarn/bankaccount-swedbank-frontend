import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return from(auth.getJwt()).pipe(
    switchMap(token =>
      next(req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      }))
    )
  );
};
