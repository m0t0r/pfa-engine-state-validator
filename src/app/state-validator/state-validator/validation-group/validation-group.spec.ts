import { ValidationGroup } from './validation-group';
import { ValidationCase } from '../validation-case/validation-case';

describe('ValidationGroup', () => {

  it('should be able to return an instance', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vGroup = new ValidationGroup('AND', [vCase1, vCase2]);

    expect(vGroup.getType()).toBe('AND');
    expect(vGroup.getCases().length).toBe(2);
  });

  it('should be able to support "AND" validation type for ValidationCase', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vGroup = new ValidationGroup('AND', [vCase1, vCase2]);
    let validInput = {
      foo: 'bar',
      baz: 23
    };
    let invalidInput1 = {
      foo: 'bar',
      baz: 125
    };

    let invalidInput2 = {
      foo: 'bar',
      bar: 'foo'
    };

    expect(vGroup.validate(validInput)).toBeTruthy();
    expect(vGroup.validate(invalidInput1)).toBeFalsy();
    expect(vGroup.validate(invalidInput2)).toBeFalsy();
  });

  it('should be able to support "AND" validation for nested ValidationGroup', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vCase3 = new ValidationCase('bat', 50, 'lt');
    let vGroup1 = new ValidationGroup('AND', [vCase1, vCase2]);
    let vGroup2 = new ValidationGroup('AND', [vCase3, vGroup1]);

    let validInput = {
      foo: 'bar',
      baz: 99,
      bat: 52
    };

    let invalidInput1 = {
      foo: 'bar',
      baz: 101,
      bat: 52
    };

    let invalidInput2 = {
      foo: 'bar',
      bar: 'baz',
      bat: 52
    };

    expect(vGroup2.validate(validInput)).toBeTruthy();
    expect(vGroup2.validate(invalidInput1)).toBeFalsy();
    expect(vGroup2.validate(invalidInput2)).toBeFalsy();
  });

  it('should be able to support "OR" validation type for ValidationCase', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vGroup = new ValidationGroup('OR', [vCase1, vCase2]);
    let validInput = {
      foo: 'bar',
      baz: 123
    };
    let invalidInput = {
      foo: 'baz',
      baz: 125
    };

    expect(vGroup.validate(validInput)).toBeTruthy();
    expect(vGroup.validate(invalidInput)).toBeFalsy();
  });

  it('should be able to support "OR" validation for nested ValidationGroup', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vCase3 = new ValidationCase('bat', 50, 'lt');
    let vGroup1 = new ValidationGroup('OR', [vCase1, vCase2]);
    let vGroup2 = new ValidationGroup('OR', [vCase3, vGroup1]);

    let validInput1 = {
      foo: 'bar',
      baz: 199,
      bat: 52
    };

    let validInput2 = {
      foo: 'baz',
      baz: 101,
      bat: 52
    };

    let invalidInput = {
      foo: 'baz',
      bar: 101,
      bat: 20
    };

    expect(vGroup2.validate(validInput1)).toBeTruthy();
    expect(vGroup2.validate(validInput2)).toBeTruthy();
    expect(vGroup2.validate(invalidInput)).toBeFalsy();
  });

  it('should be able to support complex validation conditions', () => {
    let vCase1 = new ValidationCase('foo', 'bar', 'eq');
    let vCase2 = new ValidationCase('baz', 100, 'gt');
    let vCase3 = new ValidationCase('bat', 50, 'lt');
    let vGroup1 = new ValidationGroup('OR', [vCase1, vCase2]);
    let vGroup2 = new ValidationGroup('AND', [vCase3, vGroup1]);

    let validInput = {
      foo: 'baz',
      baz: 50,
      bat: 65
    };

    let invalidInput = {
      foo: 'baz',
      bar: 101,
      bat: 120
    };

    expect(vGroup2.validate(validInput)).toBeTruthy();
    expect(vGroup2.validate(invalidInput)).toBeFalsy();
  });
});
