import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MEAT_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.tokensRevokeUrl = `${MEAT_API}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.authService.removeToken();
    });
  }
}
