import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import {createRenderer} from 'react-addons-test-utils'
// import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import QuestionOption from '../QuestionOption'
import questions from '../../questions'

describe('QuestionOption', () => {
  beforeEach(function() {
    let question = questions.getSurveyQuestions().q1;
    let option = question.options[0];
    let answers = {};
    let renderer = createRenderer();
    renderer.render(<QuestionOption option={option} selectOption={() => {}} questionId="q1" answers={answers} />);
    this.result = renderer.getRenderOutput();
  });

  describe('structure', () => {
    it('works', function() {
      let expectedResult = (
        <li className="option" onClick={() => {}}>
          <span>opt1</span>
        </li>
      );
      expect(this.result).toEqualJSX(expectedResult);
    });
  });

  describe('state', () => {
    it('should show chart and responses if question has been answered');

    it('should change answer if selected');
  });

  describe('props', () => {
    it('has option propType that is a required object', function() {
      expect(QuestionOption.propTypes.option).toExist();
      // TODO: fix test for option proptype
      // expect(QuestionOption.propTypes.option).toBe(React.PropTypes.shape({
      //   id: React.PropTypes.number.isRequired,
      //   title: React.PropTypes.string.isRequired,
      //   imageUrl: React.PropTypes.string
      // }).isRequired);
    });

    it('has selectOption propType that is a required function', function() {
      expect(QuestionOption.propTypes.selectOption).toExist();
      expect(QuestionOption.propTypes.selectOption).toBe(React.PropTypes.func.isRequired);
    });

    it('has questionId propType that is a required object', function() {
      expect(QuestionOption.propTypes.questionId).toExist();
      expect(QuestionOption.propTypes.questionId).toBe(React.PropTypes.string.isRequired);
    });

    it('has answers propType that is a required object', function() {
      expect(QuestionOption.propTypes.answers).toExist();
      expect(QuestionOption.propTypes.answers).toBe(React.PropTypes.object.isRequired);
    });
  });
});
