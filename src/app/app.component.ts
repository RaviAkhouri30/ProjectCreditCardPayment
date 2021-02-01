import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CreditCardDto } from './credit-card-payment/model/credit-card-dto';
import { InitialStateType } from './credit-card-payment/store/credit-card-payment.reducer';
import * as Actions from './credit-card-payment/store/credit-card-payment.action';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './credit-card-payment/service/payment.service';
import { message } from './credit-card-payment/constants/messages.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'Credit Card Payment Application';

  public subscription!: Subscription;
  public getDataSubscriptions!: Subscription;

  public creditCardDetailsList: CreditCardDto[] = [];

  constructor(
    private store: Store<{ creditCardPayment: InitialStateType }>,
    private router: Router,
    private toastr: ToastrService,
    private service: PaymentService
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.getDataSubscriptions) {
      this.getDataSubscriptions.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.store.select('creditCardPayment').subscribe((res: InitialStateType) => {
      if (res) {
        this.creditCardDetailsList = [];
        const result = res.creditCard;
        result.forEach((e: CreditCardDto) => {
          e = new CreditCardDto(e);
          const obj = new CreditCardDto();
          obj.setAmount(e.getAmount());
          obj.setCardHolder(e.getCardHolder());
          obj.setCreditCardNumber(e.getCreditCardNumber());
          obj.setExpirationDate(e.getExpirationDate());
          obj.setSecurityCode(e.getSecurityCode());
          this.creditCardDetailsList.push(obj);
        });
      }
    });
    this.getCreditCardDetails();
  }

  public onClick(): void {
    this.router.navigate(['/payment']);
  }

  public goToHome(): void {
    this.router.navigate(['']);
  }

  public getCreditCardDetails(): void {
    this.getDataSubscriptions = this.service.get().subscribe((res: any) => {
      if (res) {
        res.forEach((e: any) => {
          const obj = new CreditCardDto(e);
          const dispatchObj = new Actions.GetCreditCardPaymentAction();
          dispatchObj.payload = obj;
          this.store.dispatch(dispatchObj);
        });
        this.toastr.success(message.API_MESSAGE.GET);
      }
    });
  }

}
