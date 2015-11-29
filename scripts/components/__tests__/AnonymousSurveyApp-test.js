import React from 'react'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import TestUtils, {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'
import Intro from '../Intro'
import Question from '../Question'
import questions from '../../questions'

sinon.stub(questions, 'getSurveyQuestions', function() {
  return {
    q1: {
      question: 'What day is it?',
      imageUrl: 'http://i.istockimg.com/sample-question1.jpg',
      options: [
        {title: 'opt1', imageUrl: ''},
        {title: 'opt2', imageUrl: ''},
        {title: 'opt3', imageUrl: ''}
      ]
    },
    q2: {
      question: 'What time is it?',
      imageUrl: 'http://i.istockimg.com/sample-question2.jpg',
      options: [
        {title: 'opt1', imageUrl: ''},
        {title: 'opt2', imageUrl: ''}
      ]
    }
  }
});

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
          <ul className="questions">
            <Question question={{imageUrl: 'http://i.istockimg.com/sample-question1.jpg', options: [{imageUrl: '', title: 'opt1'}, {imageUrl: '', title: 'opt2'}, {imageUrl: '', title: 'opt3'}], question: 'What day is it?'}} />
            <Question question={{imageUrl: 'http://i.istockimg.com/sample-question2.jpg', options: [{imageUrl: '', title: 'opt1'}, {imageUrl: '', title: 'opt2'}], question: 'What time is it?'}} />
          </ul>
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

    it('stores questions', function() {
      expect(this.result.state.questions).toBeA('object');
    });

    it('should load questions when component loads', function() {
      expect(Object.keys(this.result.state.questions).length).toBeGreaterThan(0);
    });
  });
});
