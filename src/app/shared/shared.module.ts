import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrderService } from '../order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { AuthService } from '../security/auth.service';
import { AuthGuard } from '../security/auth.guard';
import { LogoutService } from '../security/logout.service';
import { LeaveOrderGuard } from '../order/leave-order.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SnackbarComponent]
})
export class SharedModule {

    /* Para importação condicional */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService,
                        RestaurantsService,
                        OrderService,
                        NotificationService,
                        AuthService,
                        JwtHelperService,
                        AuthGuard,
                        LogoutService,
                        LeaveOrderGuard,
                        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
                    ]
        };

    }

}
