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
    renderer.render(<Question index={questionId} question={question} selectOption={() => {}} answers={{}} />);
    this.result = renderer.getRenderOutput();
  });

  describe('structure', () => {
    it('works', function() {
      let expectedResult = (
        <li className="question">
          <h2>What day is it?</h2>
          <ul className="options">
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt1', imageUrl: '', title: 'opt1'}} totalQuestionResponseCount={12} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt2', imageUrl: '', responseCount: 8, title: 'opt2'}} totalQuestionResponseCount={12} />
            <QuestionOption answers={{}} questionId="q1" selectOption={() => {}} option={{id: 'opt3', imageUrl: '', responseCount: 4, title: 'opt3'}} totalQuestionResponseCount={12} />
          </ul>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });

    it('should pass zero totalQuestionResponseCount if no responses', function() {
      let question = questions.getSurveyQuestions().q2;
      let renderer = createRenderer();
      let questionId = "q2";
      renderer.render(<Question index={questionId} question={question} selectOption={() => {}} answers={{}} />);
      let result = renderer.getRenderOutput();

      let expectedResult = (
        <li className="question">
          <h2>What time is it?</h2>
          <ul className="options">
            <QuestionOption answers={{}} questionId="q2" selectOption={() => {}} option={{id: 'opt1', imageUrl: '', title: 'opt1'}} totalQuestionResponseCount={0} />
            <QuestionOption answers={{}} questionId="q2" selectOption={() => {}} option={{id: 'opt2', imageUrl: '', title: 'opt2'}} totalQuestionResponseCount={0} />
          </ul>
        </li>
      );
      expect(result).toEqualJSX(expectedResult);
    });


    it('should show total question responses if question has been answered');
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

    it('has selectOption propType that is a required function', function() {
      expect(Question.propTypes.selectOption).toExist();
      expect(Question.propTypes.selectOption).toBe(React.PropTypes.func.isRequired);
    });

    it('has answers propType that is a required object', function() {
      expect(Question.propTypes.answers).toExist();
      expect(Question.propTypes.answers).toBe(React.PropTypes.object.isRequired);
    });
  });
});
