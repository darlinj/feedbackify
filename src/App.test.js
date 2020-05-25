import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import {render} from '@testing-library/react';
import App from './App';
import LoginForm from './LoginForm';
import Navigator from './Navigator';

configure({adapter: new Adapter()});

describe('Rendering the app component', () => {
  it('renders the title', () => {
    const {getByText} = render(<App />);
    const element = getByText(/feedbackify/i);
    expect(element).toBeInTheDocument();
  });

  it('renders the login form', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find(LoginForm).props().credentials).toEqual({
      email: '',
      password: '',
    });
  });

  it('renders the Navbar', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Navigator)).toHaveLength(1);
    expect(wrapper.find(Navigator).props().title).toEqual("Feedbackify");
  });
 

});
