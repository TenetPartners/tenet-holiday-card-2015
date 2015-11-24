import React from 'react'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'

describe('AnonymousSurveyApp', () => {

  describe('AnonymousSurveyApp structure', () => {
    beforeEach(function() {
      let renderer = createRenderer();
      renderer.render(<AnonymousSurveyApp />);
      this.result = renderer.getRenderOutput();
    });

    it('works', function() {
      let expectedResult = (
        <div className="survey">
          <h2>Hello world</h2>
        </div>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });
  });

  describe('AnonymousSurveyApp state', () => {
    beforeEach(function() {
      this.result = renderIntoDocument(<AnonymousSurveyApp />);
    });

    it('stores the state of the app', function() {
      expect(this.result.state).toExist();
    });

    it('stores the state of surveyClosed', function() {
      expect(this.result.state.surveyClosed).toBeA('boolean');
    });
  });
});
