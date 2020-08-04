import React from 'react';
import {mount, shallow} from 'enzyme';
import {act} from 'react-dom/test-utils';
import AddQuestionForm from './AddQuestionForm';

describe('Adding questions to the list', () => {
  it('Presents the form', () => {
    const component = shallow(<AddQuestionForm />);
    expect(component.find('FormControl[name="feedback-question"]').length).toBe(
      1,
    );
    expect(component.find('Button[name="add-question"]').length).toBe(1);
  });

  it('Adds questions to the question list', async () => {
    const callback = jest.fn();
    const component = mount(<AddQuestionForm handleAddingQuestion={callback} />);
    component.find('FormControl[name="feedback-question"]').simulate('change', {
      target: {name: 'feedback-question', value: 'some question'},
    });
    component.find('form').simulate('submit', {preventDefault: () => {}});
    expect(callback).toHaveBeenCalledWith('some question');
  });
});
