import { ValidationCase } from '../validation-case/validation-case';

export class ValidationGroup {

  constructor(private type: string, private cases: (ValidationCase|ValidationGroup)[]) {
    if (!type) {
      throw new Error('ValidationGroup: "type" of validation group was not provided.');
    }
  }

  validate(input: any) {
    switch (this.type.toUpperCase()) {
      case 'AND': {
        return (this.cases as (ValidationCase|ValidationGroup)[]).every(vCase => {
          return this._validateInput(vCase, input);
        });
      }
      case 'OR': {
        return (this.cases as (ValidationCase|ValidationGroup)[]).some(vCase => {
          return this._validateInput(vCase, input);
        });
      }
    }
  }

  getType(): string {
    return this.type;
  }

  getCases(): (ValidationCase|ValidationGroup)[] {
    return this.cases;
  }

  private _validateInput(vCase:ValidationCase|ValidationGroup, input: any): boolean {
    if (vCase instanceof ValidationCase) {
      let inputObj = {};
      let inputValue = input[vCase.getAttribute()];

      if (inputValue) {
        inputObj[vCase.getAttribute()] = inputValue;
        return vCase.validate(inputObj);
      } else {
        return false;
      }
    } else if (vCase instanceof ValidationGroup) {
      return vCase.validate(input);
    }
  }
}
