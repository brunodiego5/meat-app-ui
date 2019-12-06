import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { MEAT_API } from 'src/app/app.api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError, filter} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class AuthService {
    private readonly TOKEN_ID = 'TOKEN_ID';

    oauthTokenUrl: string;
    jwtPayload: any;
    lastUrl: string;

    constructor(private http: HttpClient,
                private jwtHelper: JwtHelperService,
                private router: Router) {

        /*inscrição para pegar a ultima url acessada*/
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);

        this.oauthTokenUrl = `${MEAT_API}/oauth/token`;
        this.loadToken();
    }

    login(email: string, password: string): Observable<any> {

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = `username=${email}&password=${password}&grant_type=password`;

        return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials: true})
            .pipe(tap((response) => {
                    this.storeToken(response.access_token);
                }),
                catchError(response => {
                    if (response.status === 400 ) {
                        if (response.error.error === 'invalid_grant') {
                            return throwError('Usuário ou senha inválida');
                        }
                    }
                    return throwError(response);
                })
            );
    }

    /*Obter novo access token*/
    refreshToken(): Observable<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = 'grant_type=refresh_token';

        return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .pipe(tap((response) => {
                    this.storeToken(response.access_token);

                    return of(null);
                }),
                catchError(response => {
                    console.error('Erro ao renovar token.', response);
                    return of(null);
                })
            );
    }

    private storeToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem(this.TOKEN_ID, token);
    }

    private loadToken() {
        const token = localStorage.getItem(this.TOKEN_ID);

        if (token) {
            this.storeToken(token);
          }
    }

    getJwtToken() {
        return localStorage.getItem(this.TOKEN_ID);
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    /*verifica se o usuário tem a permissão, authService.hasPermission('NAME_ROLE') */
    hasPermission(permission: string) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
    }

    isAccessTokenInvalid() {
        return !this.getJwtToken || this.jwtHelper.isTokenExpired(this.getJwtToken());
    }

    /*limpar access token*/
    removeToken() {
        localStorage.removeItem(this.TOKEN_ID);
        this.jwtPayload = null;
    }

    hasAnyPermission(roles) {
        for (const role of roles) {
            if (this.hasPermission(role)) {
                return true;
            }
        }
        return false;
    }

    /*btoa url encodada*/
    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

}
