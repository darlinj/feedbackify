import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import { render } from '@testing-library/react';
import App from './App';
import LoginForm from './LoginForm';

configure({adapter: new Adapter()});

test('renders the title', () => {
  const { getByText } = render(<App />);
  const element = getByText(/feedbackify/i);
  expect(element).toBeInTheDocument();
});

test('renders the login form', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(LoginForm)).toHaveLength(1);
});
