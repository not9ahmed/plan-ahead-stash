import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

// Cross Form Validation occurring here
export const userFormValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const username = control.get('username');
  const firstName = control.get('firstName');
  const lastName = control.get('lastName');
  const dateOfBirth = control.get('dateOfBirth');

  if(
    (username && firstName && lastName && dateOfBirth)
    && 
    (username?.errors || firstName?.errors ||
    lastName?.errors || dateOfBirth?.errors)
  ) {
    console.log("some of the field have error");
    return {invalidForm: true};
  }

  return null;
} 


@Directive({
  selector: '[appUserFormValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: userFormValidator, multi: true}
  ]
})
export class UserFormValidatorDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    return userFormValidator(control);
  }

}
