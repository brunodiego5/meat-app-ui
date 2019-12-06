import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderItensComponent } from './order-itens/order-itens.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';

@NgModule({
    declarations: [
        OrderComponent,
        OrderItensComponent,
        DeliveryCostsComponent],
    imports: [
        SharedModule,
        OrderRoutingModule]
})
export class OrderModule {}
