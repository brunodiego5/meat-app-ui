import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { LeaveOrderGuard } from './leave-order.guard';

const routes: Routes = [
    {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
  ];

@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [RouterModule]
})

export class OrderRoutingModule { }
