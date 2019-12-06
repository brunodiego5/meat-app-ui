import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem('TOKEN_ID');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: environment.tokenWhitelistedDomains,
          blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
    SecurityRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class SecurityModule { }
