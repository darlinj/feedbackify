import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionsForm from './QuestionsForm';

configure({adapter: new Adapter()});

describe('Adding questions to the list', () => {
  it('Presents the form', () => {
    const component = shallow(<QuestionsForm />);
    expect(component.find('FormControl[name="feedback-question"]').length).toBe(1);
    expect(component.find('Button[name="add-question"]').length).toBe(1);
  });

  it('Adds questions to the question list', () => {
    const component = shallow(<QuestionsForm />);
    component.find('FormControl[name="feedback-question"]').simulate('change', {
      target: {name: 'feedback-question', value: 'some question'},
    });
    component.find('form').simulate('submit', {preventDefault: () => {}});
    expect(component.find('ListGroup[name="questions"]').text()).toContain(
      'some question',
    );
    //expect(login.mock.calls.length).toEqual(1);
    //expect(login.mock.calls[0][0]).toEqual('fred.flintstone@bedrock.com');
    //expect(login.mock.calls[0][1]).toEqual('B3dr0ck');
  });

});
