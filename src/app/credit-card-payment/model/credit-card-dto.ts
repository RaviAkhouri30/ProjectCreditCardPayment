export class CreditCardDto {
    private id: any;
    private creditCardNumber: string;
    private cardHolder: string;
    private expirationDate: string;
    private securityCode: string;
    private amount: number;

    constructor(data?: CreditCardDto) {
        if (data) {
            this.creditCardNumber = data.creditCardNumber;
            this.cardHolder = data.cardHolder;
            this.expirationDate = data.expirationDate;
            this.securityCode = data.securityCode || '';
            this.amount = data.amount;
            this.id = data.id;
            return;
        }
        this.creditCardNumber = 'default';
        this.cardHolder = '';
        this.expirationDate = '';
        this.securityCode = '';
        this.amount = 0;
        this.id = undefined;
    }

    public getId(): any {
        return this.id;
    }

    public setId(id: any): void {
        this.id = id;
    }

    public getCreditCardNumber(): string {
        return this.creditCardNumber;
    }

    public setCreditCardNumber(creditCardNumber: string): void {
        this.creditCardNumber = creditCardNumber;
    }

    public getCardHolder(): string {
        return this.cardHolder;
    }

    public setCardHolder(cardHolder: string): void {
        this.cardHolder = cardHolder;
    }

    public getExpirationDate(): string {
        return this.expirationDate;
    }

    public setExpirationDate(expirationDate: string): void {
        this.expirationDate = expirationDate;
    }

    public getSecurityCode(): string {
        return this.securityCode;
    }

    public setSecurityCode(securityCode: string): void {
        this.securityCode = securityCode;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

}
