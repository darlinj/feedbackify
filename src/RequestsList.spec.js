import React from 'react';
import {mount, shallow} from 'enzyme';
import {act} from 'react-dom/test-utils';
import RequestsList from './RequestsList';

describe('Shows request list', () => {
  it('Shows the request list', async () => {
    const requests = [
      {id: 1234, name: 'this is some request'},
      {id: 1235, name: 'this is another request'},
      {id: 1236, name: 'this is a third request'},
    ];
    const component = mount(<RequestsList requestList={requests} />);
    expect(component.find('div.list-group-item').length).toEqual(3);
    expect(component.find('ListGroup[name="requests"]').text()).toContain(
      'this is another request',
    );
  });

  it('calls the delete function if the delete button is pressed', () => {
    let foo = 0;
    const handleDelete = requestId => {
      foo = requestId;
    };
    const requests = [
      {id: 1234, name: 'this is some request'},
      {id: 999, name: 'delete this request'},
      {id: 1236, name: 'this is a third request'},
    ];
    const component = mount(
      <RequestsList
        requestList={requests}
        handleDelete={handleDelete}
      />,
    );
    component
      .find('button[requestid=999]')
      .forEach(n => console.log(n.html()));
    component.find('button[value=999]').simulate('click');
    expect(foo).toEqual(999);
  });
});
