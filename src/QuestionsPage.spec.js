import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {act} from 'react-dom/test-utils';
import QuestionsPage from './QuestionsPage';
import {API, graphqlOperation} from 'aws-amplify';
import {addQuestion, getQuestions, removeQuestion} from './apiCalls';
import QuestionsList from './QuestionsList';
import {toast} from 'react-toastify';

jest.mock('./apiCalls');
jest.mock('react-toastify');

configure({adapter: new Adapter()});

describe('Adding questions to the list', () => {
  beforeEach(() => {
    getQuestions.mockResolvedValue([
      {id: 1234, question: 'This is a question'},
      {id: 4321, question: 'This is another question'},
    ]);
    toast.error.mockImplementation(() => true);
  });

  afterEach(() => {
    getQuestions.mockClear();
    addQuestion.mockClear();
    removeQuestion.mockClear();
    toast.error.mockClear();
  });

  it('Presents the form', () => {
    const component = shallow(<QuestionsPage />);
    expect(component.find('AddQuestionForm').length).toBe(1);
    expect(component.find('QuestionsList').length).toBe(1);
  });

  it('Gets the Questions from the database', async () => {
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage />);
    });
    component.update();
    expect(getQuestions.mock.calls.length).toEqual(1);
    expect(component.find('QuestionsList').prop('questionList')).toEqual([
      {id: 1234, question: 'This is a question'},
      {id: 4321, question: 'This is another question'},
    ]);
  });

  it('raises an error if the connection to the API fails', async () => {
    getQuestions.mockRejectedValue('some listing error');
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to get questions. Check your internet connection',
      );
    });
  });

  it('Adds questions to the question list', async () => {
    addQuestion.mockResolvedValue({id: 9999, question: 'This is a question'});
    const component = shallow(<QuestionsPage requestid="999" />);
    await act(async () => {
      component.find('AddQuestionForm').prop('handleAddingQuestion')(
        'some question',
      );
    });
    expect(addQuestion.mock.calls.length).toEqual(1);
    expect(addQuestion.mock.calls[0][0]).toEqual({
      requestid: '999',
      question: 'some question',
    });
  });

  it('Raises an error if the add fails', async () => {
    addQuestion.mockRejectedValue('some error');
    const component = shallow(<QuestionsPage requestid="999" />);
    component.find('AddQuestionForm').prop('handleAddingQuestion')(
      'some question',
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to save question. Check your internet connection',
      );
    });
  });

  it('deletes questions from the list', async () => {
    removeQuestion.mockResolvedValue({id: 1234});
    let component = null;
    await act(async () => {
      component = mount(<QuestionsPage requestid="999" />);
    });
    component.update();
    await act(async () => {
      component.find('QuestionsList').prop('handleDelete')(1234);
    });
    component.update();
    expect(removeQuestion.mock.calls.length).toEqual(1);
    expect(removeQuestion.mock.calls[0][0]).toEqual({
      id: 1234,
    });
    expect(component.find('QuestionsList').prop('questionList')).toEqual([
      {id: 4321, question: 'This is another question'},
    ]);
  });

  it('Raises an error if the delete fails', async () => {
    removeQuestion.mockRejectedValue('some error');
    const component = shallow(<QuestionsPage requestid="999" />);
    component.find('QuestionsList').prop('handleDelete')( 1234);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(toast.error.mock.calls.length).toEqual(1);
      expect(toast.error.mock.calls[0][0]).toEqual(
        'Failed to delete question. Check your internet connection',
      );
    });
  });

});
