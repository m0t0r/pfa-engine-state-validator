import { ValidationCase } from './validation-case';

describe('ValidationCase', () => {

  it('should be able to an instance', () => {
    let testCase = new ValidationCase('foo', 'bar');

    expect(testCase.getValue()).toBe('bar');
    expect(testCase.getAttribute()).toBe('foo');
  });

  it('should be able to validate its own data with the input', () => {
    let testCase = new ValidationCase('foo', 'bar');
    let validInput = {foo: 'bar'};
    let invalidInput1 = {foo: 'but'};
    let invalidInput2 = {bar: 'foo'};

    expect(testCase.validate(validInput)).toBeTruthy();
    expect(testCase.validate(invalidInput1)).toBeFalsy();
    expect(testCase.validate(invalidInput2)).toBeFalsy();
  });

  it('should be able to support "eq" operator', () => {
    let testCase = new ValidationCase('foo', 'bar', 'eq');
    let validInput = {foo: 'bar'};
    let invalidInput = {foo: 'but'};

    expect(testCase.validate(validInput)).toBeTruthy();
    expect(testCase.validate(invalidInput)).toBeFalsy();
  });

  it('should be able to set "eq" as default operator', () => {
    let testCase = new ValidationCase('foo', 'bar');

    expect(testCase.getOperator()).toBe('eq');
  });

  it('should be able to support "gt" operator', () => {
    let testCase = new ValidationCase('foo', 100, 'gt');
    let validInput1 = {foo: 99};
    let validInput2 = {foo: '50'};
    let invalidInput = {foo: 101};

    expect(testCase.validate(validInput1)).toBeTruthy();
    expect(testCase.validate(validInput2)).toBeTruthy();
    expect(testCase.validate(invalidInput)).toBeFalsy();
  });

  it('should throw an error when "gt" operator is used with incompatible data types', () => {
    let testCase = new ValidationCase('foo', 100, 'gt');
    let input = {foo: 'bar'};

    expect(() => {
      testCase.validate(input);
    }).toThrow();
  });

  it('should be able to support "lt" operator', () => {
    let testCase = new ValidationCase('foo', 100, 'lt');
    let validInput1 = {foo: 110};
    let validInput2 = {foo: '150'};
    let invalidInput = {foo: 50};

    expect(testCase.validate(validInput1)).toBeTruthy();
    expect(testCase.validate(validInput2)).toBeTruthy();
    expect(testCase.validate(invalidInput)).toBeFalsy();
  });

  it('should throw an error when "lt" operator is used with incompatible data types', () => {
    let testCase = new ValidationCase('foo', 100, 'lt');
    let input = {foo: 'bar'};

    expect(() => {
      testCase.validate(input);
    }).toThrow();
  });
});
