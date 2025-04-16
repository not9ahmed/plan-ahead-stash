import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


export const assetTypeFormValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const name = control.get('name');
  
  console.log("name: ", name);

  const nameValue: string = name?.value;

  return name && nameValue.length === 3 ? {hasName: true} : null;
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
