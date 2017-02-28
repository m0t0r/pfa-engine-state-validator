export class ValidationCase {

  constructor(private attribute, private value) { }

  validate(input: any): boolean {
    let _key = Object.keys(input)[0];
    return _key === this.attribute && input[_key] === this.value;
  }

  getAttribute(): string {
    return this.attribute;
  }

  getValue(): string {
    return this.value;
  }
}
