import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


export const assetTypeFormValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const name = control.get('name');  
  const nameValue: string = name?.value;

  // check if there is name and it is of length then add eror
  return nameValue && nameValue.length === 3 ? {longName: true} : null;
};


@Directive({
  selector: '[appAssetTypeFormValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: assetTypeFormValidator, multi: true},
  ],
})
export class AssetTypeFormValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return assetTypeFormValidator(control);
  }
}
