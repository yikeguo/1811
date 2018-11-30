import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { catchError, map } from 'rxjs/operators';
import { Result } from 'src/app/common/result';

@Directive({
  selector: '[appPhoneValidator]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true}
  ]
})
export class PhoneValidatorDirective implements AsyncValidator {

  constructor(private us: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    return this.us.verifyPhone(control.value).pipe(
      map( (r: Result<string>) => {
        return r.success ? null : {verifyPhone: true};
      } ),
      catchError(e=>of({verifyPhone: true}))
    );
  }
}
