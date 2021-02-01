import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardPaymentComponent } from './credit-card-payment.component';

const routes: Routes = [
    {
        path: '',
        component: CreditCardPaymentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreditCardPaymentRoutingModule { }
