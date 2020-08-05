import React from 'react';
import {mount, shallow} from 'enzyme';
import {act} from 'react-dom/test-utils';
import RequestsPage from './RequestsPage';
import {API, graphqlOperation} from 'aws-amplify';
import {addRequest, getRequests, removeRequest} from './apiCalls';
import RequestsList from './RequestsList';
import {toast} from 'react-toastify';

jest.mock('./apiCalls');
jest.mock('react-toastify');

describe('Adding requests to the list', () => {
  beforeEach(() => {
    getRequests.mockResolvedValue([
      {id: 1234, request: 'This is a request'},
      {id: 4321, request: 'This is another request'},
    ]);
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getRequests.mockClear();
    addRequest.mockClear();
    removeRequest.mockClear();
    toast.error.mockClear();
  });

  it('Presents the form', () => {
    const component = shallow(<RequestsPage />);
    expect(component.find('AddRequestForm').length).toBe(1);
    expect(component.find('RequestsList').length).toBe(1);
  });

  it.skip('Gets the Requests from the database', async () => {
    let component = null;
    await act(async () => {
      component = mount(<RequestsPage />);
    });
    component.update();
    expect(getRequests.mock.calls.length).toEqual(1);
    expect(component.find('RequestsList').prop('requestList')).toEqual([
      {id: 1234, request: 'This is a request'},
      {id: 4321, request: 'This is another request'},
    ]);
  });

  it.skip('raises an error if the connection to the API fails', async () => {
    getRequests.mockRejectedValue('some listing error');
    let component = null;
    await act(async () => {
      component = mount(<RequestsPage />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to get requests. Check your internet connection',
      );
    });
  });

  it.skip('Adds requests to the request list', async () => {
    addRequest.mockResolvedValue({id: 9999, request: 'This is a request'});
    const component = shallow(<RequestsPage match={{params: { id: "999" }}} />);
    await act(async () => {
      component.find('AddRequestForm').prop('handleAddingRequest')(
        'some request',
      );
    });
    expect(addRequest.mock.calls.length).toEqual(1);
    expect(addRequest.mock.calls[0][0]).toEqual({
      requestid: '999',
      request: 'some request',
    });
  });

  it.skip('Raises an error if the add fails', async () => {
    addRequest.mockRejectedValue('some error');
    const component = shallow(<RequestsPage match={{params: { id: "999" }}}  />);
    component.find('AddRequestForm').prop('handleAddingRequest')(
      'some request',
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to save request. Check your internet connection',
      );
    });
  });

  it.skip('deletes requests from the list', async () => {
    removeRequest.mockResolvedValue({id: 1234});
    let component = null;
    await act(async () => {
      component = mount(<RequestsPage match={{params: { id: "999" }}}  />);
    });
    component.update();
    await act(async () => {
      component.find('RequestsList').prop('handleDelete')(1234);
    });
    component.update();
    expect(removeRequest.mock.calls.length).toEqual(1);
    expect(removeRequest.mock.calls[0][0]).toEqual({
      id: 1234,
    });
    expect(component.find('RequestsList').prop('requestList')).toEqual([
      {id: 4321, request: 'This is another request'},
    ]);
  });

  it.skip('Raises an error if the delete fails', async () => {
    removeRequest.mockRejectedValue('some error');
    const component = shallow(<RequestsPage match={{params: {id: "999" }}} />);
    component.find('RequestsList').prop('handleDelete')( 1234);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to delete request. Check your internet connection',
      );
    });
  });

});
