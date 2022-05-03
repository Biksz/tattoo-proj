import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  size?: number;
  color?: number;
  effect?: number;

  @Output() price?: number;

  constructor() { }

  ngOnInit(): void {}

  countPrice(){
    let size : number = this.size !== undefined ? this.size as number : 0 as number;
    let parsedSize : number = +size;
    let color : number = this.color !== undefined ? this.color as number : 0 as number;
    let parsedColor : number = +color;
    let effect : number = this.effect !== undefined ? this.effect as number: 0 as number;
    let parsedEffect : number = +effect;
    this.price = parsedSize + parsedColor + parsedEffect;
  }

}
