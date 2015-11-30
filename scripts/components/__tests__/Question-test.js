import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Question from '../Question'
import questions from '../../questions'

describe('Question', () => {
  beforeEach(function() {
    let question = questions.getSurveyQuestions().q1;
    let renderer = createRenderer();
    renderer.render(<Question question={question} />);
    this.result = renderer.getRenderOutput();
  });

  describe('structure', () => {
    it('works', function() {
      let expectedResult = (
        <li className="question">
          <h2>What day is it?</h2>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });
  });

  describe('props', () => {
    it('has question propType that is a required object', function() {
      expect(Question.propTypes.question).toExist();
      // TODO: fix test for question proptype
      // expect(Question.propTypes.question).toBeA(React.PropTypes.shape);
      // expect(Question.propTypes.question).toEqual(React.PropTypes.shape({
      //   id: React.PropTypes.number.isRequired,
      //   title: React.PropTypes.string.isRequired,
      //   options: React.PropTypes.object.isRequired,
      //   imageUrl: React.PropTypes.string
      // }).isRequired);
    });
  });
});
