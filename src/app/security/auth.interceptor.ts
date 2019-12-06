import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

export class NotAuthenticatedError {}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authService = this.injector.get(AuthService);

        if (authService.isAccessTokenInvalid()) {
            console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

            const callNewAccessToken = authService.refreshToken()
              .pipe(tap(() => {
                        if (authService.isAccessTokenInvalid()) {
                            console.log('NotAuthenticatedError');
                            throw new NotAuthenticatedError();
                        }

                        return next.handle(req);
                    })
              );

        } else {
            console.log('Requisição HTTP com access token válido.');
            return next.handle(req);
        }

        return next.handle(req);
    }

}
