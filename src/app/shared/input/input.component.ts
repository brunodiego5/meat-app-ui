import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;
  @Input() showTip = true;

  input: any;

  @ContentChild(NgModel, { static: true}) model: NgModel;
  @ContentChild(FormControlName, {static: true}) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model || this.control;

    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com um diretiva ngModel ou FormControlName');
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
