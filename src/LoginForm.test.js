import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LoginForm from './LoginForm'

configure({adapter: new Adapter()})

describe('The login component', () => {
  it('Presents the login form', () => {
    const component = shallow(
      <LoginForm />,
    )
    expect(component.find('FormControl[name="email"]').length).toBe(1);
    expect(component.find('FormControl[name="password"]').length).toBe(1);
    expect(component.find('Button[name="login-button"]').length).toBe(1);
  })


})
