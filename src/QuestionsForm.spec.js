import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {act} from 'react-dom/test-utils'
import QuestionsForm from './QuestionsForm';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from './graphql/mutations';
import {listQuestions} from './graphql/queries';

jest.mock('aws-amplify');
jest.mock('./graphql/mutations');
jest.mock('./graphql/queries');

configure({adapter: new Adapter()});

describe('Adding questions to the list', () => {
  beforeEach(() => {
    API.graphql.mockResolvedValue({data: { listQuestions: { items: [ {},{}]}}});
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

  it.only('Gets the Questions from the database', async () =>  {
    let component = null
    await act(async() => {
      component = mount(<QuestionsForm />);
    });
    expect(graphqlOperation.mock.calls.length).toEqual(1);
    expect(graphqlOperation.mock.calls[0][0]).toEqual(listQuestions);
    expect(API.graphql.mock.calls.length).toEqual(1);
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
    expect(graphqlOperation.mock.calls[0][1]).toEqual({input: { requestid: 123, question: "some question"}});
    expect(API.graphql.mock.calls.length).toEqual(1);
    expect(API.graphql.mock.calls[0][0]).toEqual('graphql create question');
  });
});
