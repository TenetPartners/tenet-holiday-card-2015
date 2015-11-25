import React from 'react'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import TestUtils, {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'
import Intro from '../Intro'

describe('AnonymousSurveyApp', () => {

  describe('structure', () => {
    beforeEach(function() {
      let renderer = createRenderer();
      renderer.render(<AnonymousSurveyApp />);
      this.result = renderer.getRenderOutput();
    });

    it('works', function() {
      let expectedResult = (
        <div className="survey">
          <Intro surveyClosed={false} text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded."/>
        </div>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });
  });

  describe('state', () => {
    beforeEach(function() {
      this.result = renderIntoDocument(<AnonymousSurveyApp />);
    });

    it('stores the state of the app', function() {
      expect(this.result.state).toExist();
    });

    it('stores the state of surveyClosed', function() {
      expect(this.result.state.surveyClosed).toBeA('boolean');
    });

    it('should output closed class when survey is closed', function() {
      this.result.setState({surveyClosed: true});
      var component = TestUtils.findRenderedDOMComponentWithClass(this.result, "survey");
      expect(component.props.className).toEqual("survey closed");
    });
  });
});
