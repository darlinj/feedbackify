import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from './LoginForm';

configure({adapter: new Adapter()});

describe('The login component', () => {
  it('Presents the login form', () => {
    const component = shallow(<LoginForm />);
    expect(component.find('FormControl[name="email"]').length).toBe(1);
    expect(component.find('FormControl[name="password"]').length).toBe(1);
    expect(component.find('Button[name="login-button"]').length).toBe(1);
  });

  it('presets the credectials to the correct values', () => {
    const component = shallow(<LoginForm credentials={{email: "wilmer@bedrock.com", password: "s3cr3t"}} />);
    expect(component.find('FormControl[value="wilmer@bedrock.com"]').length).toEqual(1)
    expect(component.find('FormControl[value="s3cr3t"]').length).toEqual(1)
  });

  it('sets the credentials', () => {
    let credentials = {};
    const setCredentials = e => {
      credentials[e.target.name] = e.target.value;
    };
    const component = shallow(<LoginForm setCredentials={setCredentials} />);
    component
      .find('FormControl[name="email"]')
      .simulate('change', {
        target: {name: 'email', value: 'fred.flintstone@bedrock.com'},
      });
    component
      .find('FormControl[name="password"]')
      .simulate('change', {target: {name: 'password', value: 'B3dr0ck'}});
    expect(credentials.email).toEqual('fred.flintstone@bedrock.com');
    expect(credentials.password).toEqual('B3dr0ck');
  });
});
