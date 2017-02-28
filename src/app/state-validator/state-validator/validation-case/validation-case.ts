export class ValidationCase {

  constructor(private attribute:string,
              private value: string | number | boolean,
              private operator: string = 'eq') { }

  validate(input: any): boolean {
    let _key = Object.keys(input)[0];

    switch (this.operator.toLowerCase()) {
      case 'eq': {
        return _key === this.attribute && input[_key] === this.value;
      }
      case 'gt': {
        let _input = Number(input[_key]);
        let _value = Number(this.value);

        if ((_key === this.attribute) && (isNaN(_input) || isNaN(_value))) {
          this.throwError(this.operator);
        }

        return _key === this.attribute && _value > _input;
      }
      case 'lt': {
        let _input = Number(input[_key]);
        let _value = Number(this.value);

        if ((_key === this.attribute) && (isNaN(_input) || isNaN(_value))) {
          this.throwError(this.operator);
        }

        if (isNaN(_input) || isNaN(_value)) {
          this.throwError(this.operator);
        }

        return _key === this.attribute && _value < _input;
      }
    }
  }

  getAttribute(): string {
    return this.attribute;
  }

  getValue(): string | number | boolean {
    return this.value;
  }

  getOperator(): string {
    return this.operator;
  }

  private throwError(operator: string) {
    throw new Error(`ValidationCase: input data type is not compatible with '${this.operator}' operator.`);
  }
}
