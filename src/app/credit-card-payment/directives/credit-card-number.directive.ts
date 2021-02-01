import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditCardNumber]'
})
export class CreditCardNumberDirective {

  private regexp: RegExp = new RegExp(/[^0-9 ]*/g);

  private specialKeys: Array<string> = ['Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft', 'Backspace', 'Delete'];

  constructor(
    private el: ElementRef
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

    if (next.length > 19) {
      event.preventDefault();
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      return;
    }

    if (possition === 4 || possition === 9 || possition === 14) {
      current = current + ' ';
    }

    const testWithRegexp = next.replace(this.regexp, '');

    if (String(testWithRegexp) !== String(next)) {
      event.preventDefault();
      return;
    }

    this.el.nativeElement.value = current.replace(this.regexp, '');

  }

}
