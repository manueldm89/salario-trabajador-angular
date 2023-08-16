import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[letters-only], textarea[letters-only]'
})
export class LettersOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    
    const initalValue:string = this._el.nativeElement.value;    

    const patron = /^[A-Za-z ]+$/g;
    let regEx =  new RegExp(patron);    

    if(regEx.test(initalValue))      
      return;          
    else{            
      this._el.nativeElement.value = initalValue.substring(0, initalValue.length-1);
      event.stopPropagation();
    }

  }

}


@NgModule({
  declarations: [LettersOnlyDirective],
  imports: [
    CommonModule
  ],
  exports:[LettersOnlyDirective]
})
export class LettersOnlyModule { }
