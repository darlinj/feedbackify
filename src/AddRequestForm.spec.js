import React from 'react';
import {mount, shallow} from 'enzyme';
import {act} from 'react-dom/test-utils';
import AddRequestForm from './AddRequestForm';

describe('Adding requests to the list', () => {
  it('Presents the form', () => {
    const component = shallow(<AddRequestForm />);
    expect(component.find('FormControl[name="feedback-request"]').length).toBe(
      1,
    );
    expect(component.find('Button[name="add-request"]').length).toBe(1);
  });

  it('Adds requests to the request list', async () => {
    const callback = jest.fn();
    const component = mount(<AddRequestForm handleAddingRequest={callback} />);
    component.find('FormControl[name="feedback-request"]').simulate('change', {
      target: {name: 'feedback-request', value: 'some request'},
    });
    component.find('form').simulate('submit', {preventDefault: () => {}});
    expect(callback).toHaveBeenCalledWith('some request');
  });
});
