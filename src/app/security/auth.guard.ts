import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(private authService: AuthService,
                private router: Router) {}

    checkAuthentication(path: string): Observable<boolean> | boolean {
        if (this.authService.isAccessTokenInvalid()) {
            console.log('Navegação com access token inválido. Obtendo novo token...');

            return this.authService.refreshToken()
              .pipe(() => {
                if (this.authService.isAccessTokenInvalid()) {
                  this.authService.handleLogin(`/${path}`);
                  return of(false);
                }

                return of(true);
              });
        }

        return of(true);
    }

    /*passa quando carrega o módulo*/
    canLoad(route: Route): Observable<boolean> | boolean {
        return this.checkAuthentication(route.path);
    }

    /*passa toda a vez q ativa*/
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> | boolean {
        const loggedIn = this.checkAuthentication(activatedRoute.routeConfig.path);

        if (!loggedIn) {
          if (activatedRoute.data.roles && !this.authService.hasAnyPermission(activatedRoute.data.roles)) {
            this.router.navigate(['/nao-autorizado']);
            return of(false);
          }
        } else {
          return loggedIn;
        }
    }

}
