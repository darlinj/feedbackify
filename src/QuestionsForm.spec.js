import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionsForm from './QuestionsForm';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from './graphql/mutations';

jest.mock('aws-amplify');
jest.mock('./graphql/mutations');

configure({adapter: new Adapter()});

describe('Adding questions to the list', () => {
  beforeEach(() => {
    API.graphql.mockResolvedValue('some graph1l thing');
    graphqlOperation.mockReturnValue('graphql create question');
  });

  afterEach(() => {
    API.graphql.mockClear();
    graphqlOperation.mockClear();
  });

  it('Presents the form', () => {
    const component = shallow(<QuestionsForm />);
    expect(component.find('FormControl[name="feedback-question"]').length).toBe(
      1,
    );
    expect(component.find('Button[name="add-question"]').length).toBe(1);
  });

  it('Adds questions to the question list', () => {
    const component = shallow(<QuestionsForm />);
    component.find('FormControl[name="feedback-question"]').simulate('change', {
      target: {name: 'feedback-question', value: 'some question'},
    });
    component.find('form').simulate('submit', {preventDefault: () => {}});
    expect(component.find('ListGroup[name="questions"]').text()).toContain(
      'some question',
    );
    expect(graphqlOperation.mock.calls.length).toEqual(1);
    expect(graphqlOperation.mock.calls[0][0]).toEqual(createQuestion);
    expect(API.graphql.mock.calls.length).toEqual(1);
    expect(API.graphql.mock.calls[0][0]).toEqual('graphql create question');
  });
});
