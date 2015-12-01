import React from 'react'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import TestUtils, {createRenderer, Simulate, renderIntoDocument} from 'react-addons-test-utils'
import sinon from 'sinon'
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AnonymousSurveyApp from '../AnonymousSurveyApp'
import PictureFillImage from '../PictureFillImage'

describe('AnonymousSurveyApp', () => {

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