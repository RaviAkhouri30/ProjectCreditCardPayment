import { CreditCardDto } from '../model/credit-card-dto';
import * as CreditCardsActions from './credit-card-payment.action';

export declare interface InitialStateType {
    creditCard: CreditCardDto[];
}

const initialState: InitialStateType = {
    creditCard: []
};


export const creditCardPaymentReducer = (state = initialState, action: CreditCardsActions.NewCreditCardPaymentAction | any) => {
    switch (action.type) {
        case CreditCardsActions.NEW_CREDIT_CARD_PAYMENT:
            const temp: CreditCardDto[] = [];
            state.creditCard.forEach(e => {
                temp.push(e);
            });
            temp.push(action.payload);
            return {
                ...temp,
                creditCard: temp
            };
        case CreditCardsActions.GET_CREDIT_CARD_PAYMENT:
            const obj: CreditCardDto[] = [];
            state.creditCard.forEach(e => {
                obj.push(e);
            });
            obj.push(action.payload);
            return {
                ...obj,
                creditCard: obj
            };
        default: return state;
    }
};
