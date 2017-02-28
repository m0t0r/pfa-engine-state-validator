import {ValidationCase} from "./validation-case";
export class ValidationGroup {

  constructor(private type: string, rules: ValidationCase[]|ValidationGroup[]) {}

}
