import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-required-input',
  templateUrl: './required-input.component.html'
//   styleUrls: ['./required-input.component.scss'],
})
export class RequiredInputComponent {

  @Input() fieldName: string;

//   get f() {
//     return this.ngForm.controls;
//   }


}
