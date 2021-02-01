import { Action } from '@ngrx/store';
import { CreditCardDto } from '../model/credit-card-dto';

export const NEW_CREDIT_CARD_PAYMENT = 'NEW_CREDIT_CARD_PAYMENT';
export const GET_CREDIT_CARD_PAYMENT = 'GET_CREDIT_CARD_PAYMENT';


export class NewCreditCardPaymentAction implements Action {
    readonly type = NEW_CREDIT_CARD_PAYMENT;
    public payload!: CreditCardDto;
}

export class GetCreditCardPaymentAction implements Action {
    readonly type = GET_CREDIT_CARD_PAYMENT;
    public payload!: CreditCardDto;
}
