import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyAmount]'
})
export class OnlyAmountDirective {

  private regexp: RegExp = new RegExp(/^\d{0,10}\.?\d{0,2}$/g);

  private specialKeys: Array<string> = ['Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft', 'Backspace', 'Delete'];

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const possition = this.el.nativeElement.selectionStart;

    const next: string = [
      current.slice(0, possition),
      event.key === 'Decimal' ? '.' : event.key, current.slice(possition)
    ].join('');

    let index = next.indexOf('.');

    if (index === -1) {
      index = next.length + index + 1;
    }

    if (next && !String(next).match(this.regexp) || index > 10) {
      event.preventDefault();
      return;
    }

  }

  @HostListener('blur', ['$event'])
  public onBlur(): void {
    this.el.nativeElement.value = Number(this.el.nativeElement.value).toFixed(2);
  }

}
