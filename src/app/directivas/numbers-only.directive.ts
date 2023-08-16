import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbers-only]'
})
export class NumbersOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    
    const initalValue:string = this._el.nativeElement.value;    

    const patron = /^[0-9]+$/g;
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
  declarations: [NumbersOnlyDirective],
  imports: [
    CommonModule
  ],
  exports:[NumbersOnlyDirective]
})
export class NumbersOnlyModule { }
