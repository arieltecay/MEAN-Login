import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private authservice: AuthService) {}

  intercept(req: any, next: any) {
    const tokenizeRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authservice.getToken()}`,
      },
    });
    return next.handle(tokenizeRequest);
  }
}
