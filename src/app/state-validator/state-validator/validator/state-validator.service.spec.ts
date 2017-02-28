import { TestBed, inject } from '@angular/core/testing';

import { StateValidator } from './state-validator.service';

describe('StateValidator service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateValidator]
    });
  });

  it('should exist', inject([StateValidator], (service: StateValidator) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to validate simple state', inject([StateValidator], (service: StateValidator) => {
    let validInput = {
      foo: 'bar'
    };
    let invalidInput = {
      foo: 'baz',
      bar: 'but'
    };

    let state = {
      conditions: [
        {
          attribute: 'foo',
          value: 'bar'
        }
      ]
    };

    expect(service.validate(validInput, state.conditions)).toBeTruthy();
    expect(service.validate(invalidInput, state.conditions)).toBeFalsy();
  }));

});
