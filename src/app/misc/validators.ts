import { AbstractControl, ValidationErrors } from '@angular/forms';
import validators from 'validator';

export class PlatformValidators {
  public static ascii(control: AbstractControl): ValidationErrors | null {
    if (!control.value || validators.isAscii(control.value)) {
      return null;
    }
    return { ascii: true };
  }
}
