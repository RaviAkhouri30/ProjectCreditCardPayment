import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyAlphabets]'
})
export class OnlyAlphabetsDirective {

  @Input() maxLength = 0;   // can be used to set Default length

  private regexp: RegExp = new RegExp(/[^a-zA-Z ]*/g);

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
      event.key,
      current.slice(possition)
    ].join('');

    if (next.length > this.maxLength) {
      event.preventDefault();
      return;
    }

    const testWithRegexp = next.replace(this.regexp, '');

    if (String(testWithRegexp) !== String(next)) {
      event.preventDefault();
      return;
    }

    this.el.nativeElement.value = current.replace(this.regexp, '');

  }

}
