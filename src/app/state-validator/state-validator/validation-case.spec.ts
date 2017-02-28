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
});
