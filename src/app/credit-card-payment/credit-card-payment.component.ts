import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreditCardDto } from './model/credit-card-dto';
import { InitialStateType } from './store/credit-card-payment.reducer';
import * as Actions from './store/credit-card-payment.action';
import { ToastrService } from 'ngx-toastr';
import { message } from './constants/messages.constant';
import { PaymentService } from './service/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.css']
})
export class CreditCardPaymentComponent implements OnInit, OnDestroy {

  public creditCardInfoform!: FormGroup;
  public msg = message;

  public subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ creditCardPayment: InitialStateType }>,
    private toastr: ToastrService,
    private service: PaymentService
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.creditCardInfoform = this.fb.group({
      creditCardNumber: ['', [Validators.required, Validators.minLength(19)]],
      creditCardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5)]],
      ccv: ['', Validators.minLength(3)],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  public doPayment(): void {
    if (this.creditCardInfoform.invalid) {
      Object.keys(this.creditCardInfoform.controls).forEach(key => {
        this.creditCardInfoform.get(key)?.markAsTouched();
      });
      this.toastr.error(message.FORM_VALIDATION.INVALID_FORM_DATA);
      return;
    }
    const formVal = this.creditCardInfoform.getRawValue();
    const obj = new CreditCardDto();
    obj.setAmount(formVal.amount);
    obj.setCardHolder(formVal.creditCardHolderName);
    obj.setCreditCardNumber(formVal.creditCardNumber);
    obj.setExpirationDate(formVal.expirationDate);
    obj.setSecurityCode(formVal.ccv);
    obj.setId(undefined);
    const dispatchObj = new Actions.NewCreditCardPaymentAction();
    dispatchObj.payload = obj;
    this.store.dispatch(dispatchObj);
    this.saveCreditCardDetails(obj);
  }

  public saveCreditCardDetails(data: CreditCardDto): void {
    const param = data;
    this.subscription = this.service.save(param).subscribe((res: any) => {
      if (res) {
        this.toastr.success(message.API_MESSAGE.CREATE);
      }
    });
  }

}
