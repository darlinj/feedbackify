import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {act} from 'react-dom/test-utils';
import QuestionsForm from './QuestionsForm';
import {API, graphqlOperation} from 'aws-amplify';
import {addQuestion, getQuestions} from './apiCalls';
import QuestionsList from './QuestionsList';

jest.mock('./apiCalls');

configure({adapter: new Adapter()});

describe('Adding questions to the list', () => {
  beforeEach(() => {
    getQuestions.mockResolvedValue([{id: 1234, question: "This is a question"}, {id: 4321, question: "This is another question"}]);
    addQuestion.mockResolvedValue({id: 9999, question: "This is a question"});
  });

  afterEach(() => {
    getQuestions.mockClear();
    addQuestion.mockClear();
  });

  it('Presents the form', () => {
    const component = shallow(<QuestionsForm />);
    expect(component.find('FormControl[name="feedback-question"]').length).toBe(
      1,
    );
    expect(component.find('Button[name="add-question"]').length).toBe(1);
  });

  it('Gets the Questions from the database', async () => {
    let component = null;
    await act(async () => {
      component = mount(<QuestionsForm />);
    });
    expect(getQuestions.mock.calls.length).toEqual(1);
  });

  it('Adds questions to the question list', async () => {
    let component = null;
    await act(async () => {
      component = mount(<QuestionsForm />);
      component
        .find('FormControl[name="feedback-question"]')
        .simulate('change', {
          target: {name: 'feedback-question', value: 'some question'},
        });
    });
    component.update();
    await act(async () => {
      component.find('form').simulate('submit', {preventDefault: () => {}});
    });
    expect(addQuestion.mock.calls.length).toEqual(1);
    expect(addQuestion.mock.calls[0][0]).toEqual({requestid:123, question: 'some question'});
  });

});
