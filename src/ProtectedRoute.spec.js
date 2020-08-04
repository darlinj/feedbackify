import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router';
import {Route} from 'react-router-dom';
import LoginForm from './LoginForm';
import ProtectedRoute from './ProtectedRoute';

const ProtectedPage = () => {
  return <div>Protected Page</div>
}

describe('protected routes', () => {
  it('shows the protected page when the user is logged in', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute currentUser={{some: "user"}} component={ProtectedPage} path="/protected" />
      </MemoryRouter>,
    );
    expect(wrapper.find(ProtectedPage)).toHaveLength(1);
    expect(wrapper.find(Route).html()).toContain("Protected Page")
  });

  it('shows the loging page when not logged in', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute currentUser={undefined} component={ProtectedPage} path="/protected" />
      </MemoryRouter>,
    );
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});
