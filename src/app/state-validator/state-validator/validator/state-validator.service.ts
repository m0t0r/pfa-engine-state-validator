import { Injectable } from '@angular/core';
import { ValidationCase } from '../validation-case/validation-case';
import { WState } from '../interfaces';

@Injectable()
export class StateValidator {
  public conditions_: ValidationCase[] = [];

  validate(input: any, stateCases: WState[]): boolean {
    this.initValidationCases(stateCases);

    let _keys = Object.keys(input);

    return this.conditions_.some((vCase: ValidationCase, index: number) => {
      let inputObj = {};
      inputObj[_keys[index]] = input[_keys[index]];
      if (vCase.validate(<[{key: string}]>inputObj)) {
        return true;
      }
    });
  }

  private initValidationCases(cases: WState[]) {
    cases.forEach((c: WState) => {
      let vCase = new ValidationCase(c.attribute, c.value);
      this.conditions_.push(vCase);
    });
  }
}
