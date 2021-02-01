import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { message } from './../constants/messages.constant';

@Directive({
  selector: '[appCreditCardExpDate]'
})
export class CreditCardExpDateDirective {

  private regexp: RegExp = new RegExp(/[^0-9-]*/g);

  private specialKeys: Array<string> = ['Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft', 'Backspace', 'Delete'];

  constructor(
    private el: ElementRef,
    private toastr: ToastrService
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    const possition = this.el.nativeElement.selectionStart;

    const next: string = [
      current.slice(0, possition),
      event.key,
      current.slice(possition)
    ].join('');

    if (next.length > 5) {
      event.preventDefault();
      return;
    }

    if (event.key === '-') {
      event.preventDefault();
      return;
    }

    if (possition === 2) {
      current = current + '-';
    }

    const testWithRegexp = next.replace(this.regexp, '');

    if (String(testWithRegexp) !== String(next)) {
      event.preventDefault();
      return;
    }

    this.el.nativeElement.value = current.replace(this.regexp, '');
  }

  @HostListener('blur', ['$event'])
  public onBlur(): void {

    const current: string = this.el.nativeElement.value;

    const currentDate: Date = new Date();
    const currentYear = Number(currentDate.getFullYear());
    const currentMonth = Number(currentDate.getMonth()) + 1;
    const lastTwoDigitOfYear = currentYear % 100;

    if (current.length !== 5) {
      this.toastr.error(message.FORM_VALIDATION.INVALID_DATE);
      this.el.nativeElement.value = '';
      this.el.nativeElement.focus();
    }

    const splitCurrent = current.split('-');
    const month = Number(splitCurrent[0]);
    const year = Number(splitCurrent[1]);

    if (month === 0 || month > 12) {
      this.toastr.error(message.FORM_VALIDATION.INVALID_DATE);
      this.el.nativeElement.value = '';
      this.el.nativeElement.focus();
    }

    if (year < lastTwoDigitOfYear) {
      this.toastr.error(message.FORM_VALIDATION.INVALID_DATE);
      this.el.nativeElement.value = '';
      this.el.nativeElement.focus();
    }

    if (year === lastTwoDigitOfYear && month < currentMonth) {
      this.toastr.error(message.FORM_VALIDATION.INVALID_DATE);
      this.el.nativeElement.value = '';
      this.el.nativeElement.focus();
    }

  }

}
