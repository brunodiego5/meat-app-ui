import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from './order.model';
import { OrderComponent } from './order.component';

export class  LeaveOrderGuard implements CanDeactivate<OrderComponent> {


    canDeactivate(orderComponent: OrderComponent,
                  actvatedRoute: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot): boolean {
        if (!orderComponent.isOderCompleted()) {
            return window.confirm('Deseja desistir da compra?');
        } else {
            return true;
        }
    }
}
