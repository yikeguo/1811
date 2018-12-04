import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Result } from '../../common/result';

@Directive({
  selector: '[appVerCodeValidator]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: CaptchaValidatorDirective, multi: true}
  ]
})
export class CaptchaValidatorDirective implements AsyncValidator {

  constructor(private us: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    return this.us.verifyCodeImg(control.value).pipe(
      map( (r: Result<null>) => {
        return r.success ? null : {verifyCodeImg: true};
      } ),
      catchError(e=>of({verifyCodeImg: true}))
    );
  }

}
