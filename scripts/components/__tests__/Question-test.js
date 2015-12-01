import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Question from '../Question'
import QuestionOption from '../QuestionOption'
import questions from '../../questions'

describe('Question', () => {
  beforeEach(function() {
    let question = questions.getSurveyQuestions().q1;
    let renderer = createRenderer();
    let questionId = "q1";
    renderer.render(<Question index={questionId} question={question} selectOption={() => {}} />);
    this.result = renderer.getRenderOutput();
  });

  describe('structure', () => {
    it('works', function() {
      let expectedResult = (
        <li className="question">
          <h2>What day is it?</h2>
          <ul className="options">
            <QuestionOption questionId="q1" selectOption={() => {}} option={{id: 'opt1', imageUrl: '', title: 'opt1'}} />
            <QuestionOption questionId="q1" selectOption={() => {}} option={{id: 'opt2', imageUrl: '', title: 'opt2'}} />
            <QuestionOption questionId="q1" selectOption={() => {}} option={{id: 'opt3', imageUrl: '', title: 'opt3'}} />
          </ul>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });

    it('should show only results if question has been answered');
    it('should show only results if survey is closed');
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

    it('has index propType that is a required object', function() {
      expect(Question.propTypes.index).toExist();
      expect(Question.propTypes.index).toBe(React.PropTypes.string.isRequired);
    });
  });
});
