import React from 'react';
import {mount, shallow} from 'enzyme';
import App from './App';
import Routes from './Routes';
import Navigator from './Navigator';
import {getCurrentUser} from './authentication'
import {act} from 'react-dom/test-utils'

jest.mock('./authentication');

describe('Rendering the app component', () => {
  beforeEach(() => {
    getCurrentUser.mockResolvedValue({some: "user"});
  })

  afterEach(() => {
    getCurrentUser.mockClear()
  })

  it('with the Navbar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Navigator)).toHaveLength(1);
    expect(wrapper.find(Navigator).props().title).toEqual("Feedbackify");
    expect(wrapper.find(Navigator).props().currentUser).toBeUndefined
  });
 
  it('with the page body', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Routes)).toHaveLength(1);
    expect(typeof(wrapper.find(Routes).props().setCurrentUser)).toEqual("function");
    expect(wrapper.find(Routes).props().currentUser).toBeUndefined()
  });

  it('checks that the session is still alive', async () => {
    let wrapper = '';
    await act(async() => {
      wrapper = mount( <App />);
    });
    wrapper.update();
    expect(getCurrentUser.mock.calls.length).toEqual(1)
    expect(wrapper.find(Routes).props().currentUser).toEqual({some: "user"})
    expect(wrapper.find(Routes).props().isLoading).toEqual(false)
  })

  it('sets the loading flag while the session is being checked', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Routes)).toHaveLength(1);
    expect(wrapper.find(Routes).props().isLoading).toEqual(true)
  })

});
