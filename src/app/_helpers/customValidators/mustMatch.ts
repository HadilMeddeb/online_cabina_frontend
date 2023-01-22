import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export  function ConfirmPasswordValidator(controlName: any, matchingControlName: any) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&!matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  export function length(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value<10000000||control.value>99999999)) {
            return { length: true };
        }
        return null;
    };
}


export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let upperCaseCharacters = /[A-Z]+/g;
    let lowerCaseCharacters = /[a-z]+/g;
    let numberCharacters = /[0-9]+/g;
    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; 

    if (!upperCaseCharacters.test(control.value) || !lowerCaseCharacters.test(control.value) || !numberCharacters.test(control.value) || !specialCharacters.test(control.value)) {
          return { passwordValidation: true };
      }
      return null;
  };
}

export function tarifValidation(value:number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value>value)) {
      return { length: true };
  }
  return null;
  };
}


export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}



export function verifDateInInterval(start:Date,end:Date)
{
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value>end||control.value<start)) {
      return { intervalDate: true };
  }
  return null;
  };
}


