import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer, renderIntoDocument} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Intro from '../Intro'

describe('Intro', () => {

  describe('structure', () => {
    it('works', function() {
      let renderer = createRenderer();
      renderer.render(<Intro text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded." />);
      var result = renderer.getRenderOutput();

      expect(result.type).toEqual('p');
      expect(result.props.className).toEqual('intro');
      expect(result.props.children).toEqual('Please answer the questions below and check back later for the full results.');
    });

    it('surveyClosed prop should be false by default', function() {
      var res = renderIntoDocument(<Intro text="hello" />);
      expect(res.props.surveyClosed).toEqual(false);
    });

    it('when surveyClosed it should show alternate text if specified', function() {
      let renderer = createRenderer();
      renderer.render(<Intro text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded." surveyClosed={true} />);
      var result = renderer.getRenderOutput();

      let expectedResult = (
        <p className="intro">Thank you for taking our holiday survey. Here's how everyone responded.</p>
      );
      expect(result).toEqualJSX(expectedResult);
    });

    it('when surveyClosed it should show default text if surveyClosedText is not specified', function() {
      let renderer = createRenderer();
      renderer.render(<Intro text="Please answer the questions below and check back later for the full results." surveyClosed={true} />);
      var result = renderer.getRenderOutput();

      let expectedResult = (
        <p className="intro">Please answer the questions below and check back later for the full results.</p>
      );
      expect(result).toEqualJSX(expectedResult);
    });
  });

  describe('props', () => {
    it('has text propType that is a required string', function() {
      expect(Intro.propTypes.text).toExist();
      expect(Intro.propTypes.text).toBe(React.PropTypes.string.isRequired);
    });

    it('has surveyClosedText propType that is an optional string', function() {
      expect(Intro.propTypes.surveyClosedText).toExist();
      expect(Intro.propTypes.surveyClosedText).toBe(React.PropTypes.string);
    });

    it('has surveyClosed propType that is an optional bool', function() {
      expect(Intro.propTypes.surveyClosed).toExist();
      expect(Intro.propTypes.surveyClosed).toBe(React.PropTypes.bool);
    });
  });
});
