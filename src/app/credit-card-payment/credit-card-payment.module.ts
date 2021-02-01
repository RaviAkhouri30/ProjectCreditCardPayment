import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardPaymentRoutingModule } from './credit-card-payment-routing.module';
import { CreditCardPaymentComponent } from './credit-card-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreditCardNumberDirective } from './directives/credit-card-number.directive';
import { CreditCardExpDateDirective } from './directives/credit-card-exp-date.directive';
import { OnlyAlphabetsDirective } from './directives/only-alphabets.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { OnlyAmountDirective } from './directives/only-amount.directive';



@NgModule({
  declarations: [
    CreditCardPaymentComponent,
    CreditCardNumberDirective,
    CreditCardExpDateDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
    OnlyAmountDirective
  ],
  imports: [
    CommonModule,
    CreditCardPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CreditCardPaymentComponent
  ]
})
export class CreditCardPaymentModule { }
