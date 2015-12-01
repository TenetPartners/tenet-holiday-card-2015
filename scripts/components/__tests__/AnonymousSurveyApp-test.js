import React from 'react'
// import expect, { createSpy, spyOn, isSpy } from 'expect'
import expect from 'expect'
// import TestUtils, {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import TestUtils, {renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'
// import Intro from '../Intro'
// import Question from '../Question'
import questions from '../../questions'

sinon.stub(questions, 'getSurveyQuestions', function() {
  return {
    q1: {
      question: 'What day is it?',
      imageUrl: 'http://i.istockimg.com/sample-question1.jpg',
      options: [
        {id: 'opt1', title: 'opt1', imageUrl: ''},
        {id: 'opt2', title: 'opt2', imageUrl: ''},
        {id: 'opt3', title: 'opt3', imageUrl: ''}
      ]
    },
    q2: {
      question: 'What time is it?',
      imageUrl: 'http://i.istockimg.com/sample-question2.jpg',
      options: [
        {id: 'opt1', title: 'opt1', imageUrl: ''},
        {id: 'opt2', title: 'opt2', imageUrl: ''}
      ]
    }
  }
});

sinon.stub(AnonymousSurveyApp.prototype, 'componentDidMount', function() {
  this.state.questions = questions.getSurveyQuestions();
});

describe('AnonymousSurveyApp', () => {

  describe('structure', () => {
    beforeEach(function() {
      // let renderer = createRenderer();
      // renderer.render(<AnonymousSurveyApp />);
      // this.result = renderer.getRenderOutput();
      this.result = renderIntoDocument(<AnonymousSurveyApp />);
    });

    it('works', function() {
      // let expectedResult = (
      //   <div className="survey">
      //     <Intro surveyClosed={false} text="Please answer the questions below and check back later for the full results." surveyClosedText="Thank you for taking our holiday survey. Here's how everyone responded."/>
      //     <ul className="questions">
      //       <Question index="q1" question={{imageUrl: 'http://i.istockimg.com/sample-question1.jpg', options: [{id: 'opt1', imageUrl: '', title: 'opt1'}, {id: 'opt2', imageUrl: '', title: 'opt2'}, {id: 'opt3', imageUrl: '', title: 'opt3'}], question: 'What day is it?'}} selectOption={() => {}} />
      //       <Question index="q2" question={{imageUrl: 'http://i.istockimg.com/sample-question2.jpg', options: [{id: 'opt1', imageUrl: '', title: 'opt1'}, {id: 'opt2', imageUrl: '', title: 'opt2'}], question: 'What time is it?'}} selectOption={() => {}} />
      //     </ul>
      //   </div>
      // );
      // expect(this.result).toEqualJSX(expectedResult);
      // let container = TestUtils.findRenderedDOMComponentWithTag(this.result, 'div');
      var component = TestUtils.findRenderedDOMComponentWithTag(this.result, "div");
      expect(component.props.className).toEqual("survey");

      component = TestUtils.findRenderedDOMComponentWithTag(this.result, "ul");
      expect(component.props.className).toEqual("questions");
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

    it('stores answers', function() {
      expect(this.result.state.answers).toBeA('object');
    })

    it('should load answers from localStorage');

    it('should have a selectOption function', function() {
      expect(this.result.selectOption).toExist();
    });

    it('selecting an option should change the state of answers', function() {
      this.result.selectOption('q1', 'opt1');
      this.result.selectOption('q2', 'opt2');
      expect(this.result.state.answers.q1).toBe('opt1');
      expect(this.result.state.answers.q2).toBe('opt2');
      this.result.selectOption('q1', 'opt2');
      expect(this.result.state.answers.q1).toBe('opt2');
      expect(this.result.state.answers.q2).toBe('opt2');
    });

    it('selecting an option should increment the option responseCount', function() {
      this.result.selectOption('q1', 'opt1');
      this.result.selectOption('q2', 'opt2');
      expect(this.result.state.questions.q1.options[0].responseCount).toEqual(1);
      expect(this.result.state.questions.q2.options[1].responseCount).toEqual(1);
      this.result.selectOption('q1', 'opt1');
      expect(this.result.state.questions.q1.options[0].responseCount).toEqual(2);
    });
  });
});
